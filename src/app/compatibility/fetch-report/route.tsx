import { NextResponse } from "next/server";
import { fetchReport } from "@/app/downloads/github";
import { AVM2Report } from "@/app/downloads/config";

let cachedReport: AVM2Report | undefined;

export async function GET() {
  if (cachedReport) {
    return NextResponse.json(cachedReport); // Return cached result
  }

  try {
    const report = await fetchReport();
    cachedReport = report; // Cache the result
    return NextResponse.json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-static";
