/* eslint-disable @typescript-eslint/no-explicit-any */

import * as d3 from "d3";
import { fetchReport } from "@/app/downloads/github";
import { JSDOM } from "jsdom";

interface Node {
  name: string;
  children: Node[];
  value?: number;
  entries?: number;
  good?: number;
  stubbed?: number;
}

class Id {
  id: string;
  href: string;

  constructor(id: string) {
    this.id = id;
    this.href = `#${id}`;
  }

  toString() {
    return "url(" + this.href + ")";
  }
}

export async function GET() {
  const { document } = new JSDOM().window;
  const report_data = await fetchReport();
  if (!report_data) {
    return;
  }

  // convert report to d3-friendly format
  const report = (function () {
    const newtree: Node = { name: "", children: [] };

    for (const [name, cls] of Object.entries(report_data.classes)) {
      let display_name = name;
      if (display_name === "") display_name = "(globals)";
      if (!display_name.includes(".")) {
        display_name = "toplevel." + display_name;
      }

      const parts = display_name.split(".");
      let curr: Node = newtree;
      for (const part of parts) {
        const found = curr.children.filter((c) => c.name === part);
        if (found.length) {
          curr = found[0];
        } else {
          const newNode = { name: part, children: [] };
          curr.children.push(newNode);
          curr = newNode;
        }
      }
      curr.value = cls.summary.max_points;
      curr.entries = cls.summary.max_points;
      curr.good = cls.summary.impl_points;
      curr.stubbed = cls.summary.stub_penalty;
    }

    function recurse(node: Node) {
      if (!node.children) return;
      for (const child of node.children) recurse(child);
      if (node.entries === undefined) {
        node.entries = 0;
      }
      if (node.good === undefined) {
        node.good = 0;
      }
      if (node.stubbed === undefined) {
        node.stubbed = 0;
      }
      for (const child of node.children) {
        node.entries += child.entries || 0;
        node.good += child.good || 0;
        node.stubbed += child.stubbed || 0;
      }
    }

    recurse(newtree);
    return newtree;
  })();

  // https://github.com/observablehq/stdlib/blob/main/src/dom/uid.js
  let count = 0;
  function uid(name: string | null) {
    return new Id("O-" + (name == null ? "" : name + "-") + ++count);
  }

  const width = 1280;
  const height = 720;

  const color = function (node: any) {
    // tree-depth coloring
    const a = d3.scaleSequential([8, 0], d3.interpolateMagma)(node.height);
    // %-based red-green scale
    const b = d3.interpolateRgb.gamma(1)("#f63538", "#30cc5a")(
      node.data.good / node.data.entries,
    );
    return d3.interpolateRgb(a, b)(0.8);
  };

  // code above is significantly based on https://observablehq.com/@d3/nested-treemap
  const treemap = (data: any) =>
    d3
      .treemap()
      .size([width, height])
      .paddingOuter(3)
      .paddingTop(19)
      .paddingInner(1)
      .round(true)(
      d3
        .hierarchy(data)
        .sum((d) => d.value)
        .sort((a, b) => (b.value || 0) - (a.value || 0)),
    );
  (function () {
    const root = treemap(report);

    const svg = d3
      .select(document.body)
      .append("svg")
      .attr("xmlns", "http://www.w3.org/2000/svg")
      .attr("viewBox", [0, 0, width, height])
      .style("font-size", "10px")
      .style("font-family", "sans-serif");

    const shadow = uid("shadow");

    svg
      .append("filter")
      .attr("id", shadow.id)
      .append("feDropShadow")
      .attr("flood-opacity", 0.3)
      .attr("dx", 0)
      .attr("stdDeviation", 3);

    // build layers, order them correctly (note: d3 docs have a bug, they don't sort)
    // @ts-expect-error TS2802
    const groups = [...d3.group(root, (d) => d.height)];
    groups.sort((a, b) => d3.descending(a[0], b[0]));

    // build the DOM
    const node = svg
      .selectAll("g")
      .data(groups)
      .join("g")
      .attr("filter", shadow.toString())
      .selectAll("g")
      .data((d) => d[1])
      .join("g")
      .attr("transform", (d: any) => `translate(${d.x0},${d.y0})`);

    // set hover-text
    node.append("title").text(
      (d: any) =>
        `${d
          .ancestors()
          .reverse()
          .map((d: any) => d.data.name)
          .join(".")}\n${d.data.good}/${d.data.entries}`,
    );

    // create colored boxes
    node
      .append("rect")
      .attr("id", (d: any) => (d.nodeUid = uid("node")).id)
      .attr("fill", (d) => color(d))
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("height", (d: any) => d.y1 - d.y0);

    // set shadows?
    node
      .append("clipPath")
      .attr("id", (d: any) => (d.clipUid = uid("clip")).id)
      .append("use")
      .attr("xlink:href", (d: any) => d.nodeUid.href);

    const format = function (node: any) {
      if (node.good == 0) {
        return [`${node.good}/${node.entries}`];
      }
      const percent = d3.format(".0%")(node.good / node.entries);
      return [`${node.good}/${node.entries}`, `(${percent})`];
    };

    // set text
    node
      .append("text")
      .attr("clip-path", (d: any) => d.clipUid)
      .selectAll("tspan")
      .data((d: any) => [d.data.name, ...format(d.data)])
      .join("tspan")
      .attr("fill-opacity", (_d, i) => (i === 0 ? null : 0.7))
      .text((d) => d);

    // move text to correct spot
    node
      .filter((d: any) => d.children)
      .selectAll("tspan")
      .attr("dx", 3)
      .attr("y", 13);

    // move text to correct spot (leaves)
    node
      .filter((d: any) => !d.children)
      .selectAll("tspan")
      .attr("x", 3)
      .attr("y", (_d, i) => `${1.1 + i * 1.1}em`);

    return svg.node();
  })();

  return new Response(document.body.innerHTML, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
    },
  });
}

export const dynamic = "force-static";
