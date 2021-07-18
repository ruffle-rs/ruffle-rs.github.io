
const lAudioContext = (typeof AudioContext !== 'undefined' ? AudioContext : webkitAudioContext);
let wasm;

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

let cachegetFloat32Memory = null;
function getFloat32Memory() {
    if (cachegetFloat32Memory === null || cachegetFloat32Memory.buffer !== wasm.memory.buffer) {
        cachegetFloat32Memory = new Float32Array(wasm.memory.buffer);
    }
    return cachegetFloat32Memory;
}

function getArrayF32FromWasm(ptr, len) {
    return getFloat32Memory().subarray(ptr / 4, ptr / 4 + len);
}

function handleError(e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
*/
export class Player {

    static __wrap(ptr) {
        const obj = Object.create(Player.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_player_free(ptr);
    }
    /**
    * @param {any} canvas
    * @param {any} swf_data
    * @returns {Player}
    */
    static new(canvas, swf_data) {
        return Player.__wrap(wasm.player_new(addHeapObject(canvas), addHeapObject(swf_data)));
    }
    /**
    * @returns {void}
    */
    destroy() {
        return wasm.player_destroy(this.ptr);
    }
}

function init(module) {
    if (typeof module === 'undefined') {
        module = import.meta.url.replace(/\.js$/, '_bg.wasm');
    }
    let result;
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        return false;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_cb_forget = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(varg0);
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        return addHeapObject(getObject(arg0));
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        return getObject(arg0) === undefined;
    };
    imports.wbg.__wbg_new_59cb74e423758ede = function() {
        return addHeapObject(new Error());
    };
    imports.wbg.__wbg_stack_558ba5917b466edd = function(ret, arg0) {

        const retptr = passStringToWasm(getObject(arg0).stack);
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);

        varg0 = varg0.slice();
        wasm.__wbindgen_free(arg0, arg1 * 1);

        console.error(varg0);
    };
    imports.wbg.__widl_f_debug_1_ = function(arg0) {
        console.debug(getObject(arg0));
    };
    imports.wbg.__widl_f_error_1_ = function(arg0) {
        console.error(getObject(arg0));
    };
    imports.wbg.__widl_f_info_1_ = function(arg0) {
        console.info(getObject(arg0));
    };
    imports.wbg.__widl_f_log_1_ = function(arg0) {
        console.log(getObject(arg0));
    };
    imports.wbg.__widl_f_warn_1_ = function(arg0) {
        console.warn(getObject(arg0));
    };
    imports.wbg.__widl_instanceof_Window = function(arg0) {
        return getObject(arg0) instanceof Window;
    };
    imports.wbg.__widl_instanceof_AudioBuffer = function(arg0) {
        return getObject(arg0) instanceof AudioBuffer;
    };
    imports.wbg.__widl_f_copy_to_channel_AudioBuffer = function(arg0, arg1, arg2, arg3) {
        let varg1 = getArrayF32FromWasm(arg1, arg2);
        try {
            getObject(arg0).copyToChannel(varg1, arg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_length_AudioBuffer = function(arg0) {
        return getObject(arg0).length;
    };
    imports.wbg.__widl_f_start_AudioBufferSourceNode = function(arg0) {
        try {
            getObject(arg0).start();
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_buffer_AudioBufferSourceNode = function(arg0, arg1) {
        getObject(arg0).buffer = getObject(arg1);
    };
    imports.wbg.__widl_f_new_AudioContext = function() {
        try {
            return addHeapObject(new lAudioContext());
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_create_buffer_AudioContext = function(arg0, arg1, arg2, arg3) {
        try {
            return addHeapObject(getObject(arg0).createBuffer(arg1 >>> 0, arg2 >>> 0, arg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_create_buffer_source_AudioContext = function(arg0) {
        try {
            return addHeapObject(getObject(arg0).createBufferSource());
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_decode_audio_data_AudioContext = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).decodeAudioData(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_destination_AudioContext = function(arg0) {
        return addHeapObject(getObject(arg0).destination);
    };
    imports.wbg.__widl_f_connect_with_audio_node_AudioNode = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).connect(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_property_CSSStyleDeclaration = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            getObject(arg0).setProperty(varg1, varg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_instanceof_CanvasRenderingContext2D = function(arg0) {
        return getObject(arg0) instanceof CanvasRenderingContext2D;
    };
    imports.wbg.__widl_f_set_global_alpha_CanvasRenderingContext2D = function(arg0, arg1) {
        getObject(arg0).globalAlpha = arg1;
    };
    imports.wbg.__widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3) {
        try {
            getObject(arg0).drawImage(getObject(arg1), arg2, arg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_fill_style_CanvasRenderingContext2D = function(arg0, arg1) {
        getObject(arg0).fillStyle = getObject(arg1);
    };
    imports.wbg.__widl_f_set_filter_CanvasRenderingContext2D = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).filter = varg1;
    };
    imports.wbg.__widl_f_fill_rect_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
    };
    imports.wbg.__widl_f_reset_transform_CanvasRenderingContext2D = function(arg0) {
        try {
            getObject(arg0).resetTransform();
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_transform_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        try {
            getObject(arg0).setTransform(arg1, arg2, arg3, arg4, arg5, arg6);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_create_element_ns_Document = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            return addHeapObject(getObject(arg0).createElementNS(varg1, varg3));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_attribute_Element = function(arg0, arg1, arg2, arg3, arg4) {
        let varg1 = getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        try {
            getObject(arg0).setAttribute(varg1, varg3);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_attribute_ns_Element = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
        let varg3 = getStringFromWasm(arg3, arg4);
        let varg5 = getStringFromWasm(arg5, arg6);
        try {
            getObject(arg0).setAttributeNS(varg1, varg3, varg5);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_get_context_HTMLCanvasElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        try {

            const val = getObject(arg0).getContext(varg1);
            return isLikeNone(val) ? 0 : addHeapObject(val);

        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_width_HTMLCanvasElement = function(arg0) {
        return getObject(arg0).width;
    };
    imports.wbg.__widl_f_set_width_HTMLCanvasElement = function(arg0, arg1) {
        getObject(arg0).width = arg1 >>> 0;
    };
    imports.wbg.__widl_f_height_HTMLCanvasElement = function(arg0) {
        return getObject(arg0).height;
    };
    imports.wbg.__widl_f_set_height_HTMLCanvasElement = function(arg0, arg1) {
        getObject(arg0).height = arg1 >>> 0;
    };
    imports.wbg.__widl_f_style_HTMLElement = function(arg0) {
        return addHeapObject(getObject(arg0).style);
    };
    imports.wbg.__widl_f_new_Image = function() {
        try {
            return addHeapObject(new Image());
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_set_src_HTMLImageElement = function(arg0, arg1, arg2) {
        let varg1 = getStringFromWasm(arg1, arg2);
        getObject(arg0).src = varg1;
    };
    imports.wbg.__widl_f_append_child_Node = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).appendChild(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_now_Performance = function(arg0) {
        return getObject(arg0).now();
    };
    imports.wbg.__widl_f_cancel_animation_frame_Window = function(arg0, arg1) {
        try {
            getObject(arg0).cancelAnimationFrame(arg1);
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_request_animation_frame_Window = function(arg0, arg1) {
        try {
            return getObject(arg0).requestAnimationFrame(getObject(arg1));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__widl_f_document_Window = function(arg0) {

        const val = getObject(arg0).document;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__widl_f_performance_Window = function(arg0) {

        const val = getObject(arg0).performance;
        return isLikeNone(val) ? 0 : addHeapObject(val);

    };
    imports.wbg.__wbg_get_fbddcd33464d9fa2 = function(arg0, arg1) {
        try {
            return addHeapObject(Reflect.get(getObject(arg0), getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_call_90045f2b8d244177 = function(arg0, arg1) {
        try {
            return addHeapObject(getObject(arg0).call(getObject(arg1)));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbg_slice_bd56dbeab4613fcb = function(arg0, arg1, arg2) {
        return addHeapObject(getObject(arg0).slice(arg1 >>> 0, arg2 >>> 0));
    };
    imports.wbg.__wbg_newnoargs_3b5b9eb6cc86e4f9 = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        return addHeapObject(new Function(varg0));
    };
    imports.wbg.__wbg_new_036f96d18aa1946d = function() {
        return addHeapObject(new Object());
    };
    imports.wbg.__wbg_then_e661fbb3e525051f = function(arg0, arg1) {
        return addHeapObject(getObject(arg0).then(getObject(arg1)));
    };
    imports.wbg.__wbg_buffer_74c31393db5a71c2 = function(arg0) {
        return addHeapObject(getObject(arg0).buffer);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_2b32877ed52450c3 = function(arg0, arg1, arg2) {
        return addHeapObject(new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0));
    };
    imports.wbg.__wbg_length_aced5b8511e876ed = function(arg0) {
        return getObject(arg0).length;
    };
    imports.wbg.__wbg_new_167081a62b2dce8b = function(arg0) {
        return addHeapObject(new Uint8Array(getObject(arg0)));
    };
    imports.wbg.__wbg_set_fc749e0d0e1acb9e = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_buffer_69068995c0fd17df = function(arg0) {
        return addHeapObject(getObject(arg0).buffer);
    };
    imports.wbg.__wbg_byteLength_496f5442d6c1a860 = function(arg0) {
        return getObject(arg0).byteLength;
    };
    imports.wbg.__wbg_byteOffset_e51a714ebefbf18a = function(arg0) {
        return getObject(arg0).byteOffset;
    };
    imports.wbg.__wbg_set_fd7fb54eff908a40 = function(arg0, arg1, arg2) {
        try {
            return Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        } catch (e) {
            handleError(e);
        }
    };
    imports.wbg.__wbindgen_debug_string = function(ret, arg0) {

        const retptr = passStringToWasm(debugString(getObject(arg0)));
        const retlen = WASM_VECTOR_LEN;
        const mem = getUint32Memory();
        mem[ret / 4] = retptr;
        mem[ret / 4 + 1] = retlen;

    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        let varg0 = getStringFromWasm(arg0, arg1);
        throw new Error(varg0);
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_memory = function() {
        return addHeapObject(wasm.memory);
    };
    imports.wbg.__wbindgen_closure_wrapper103 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(2);
        const d = wasm.__wbg_function_table.get(3);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, arg0);

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };
    imports.wbg.__wbindgen_closure_wrapper105 = function(arg0, arg1, arg2) {

        const f = wasm.__wbg_function_table.get(5);
        const d = wasm.__wbg_function_table.get(3);
        const b = arg1;
        const cb = function(arg0) {
            this.cnt++;
            let a = this.a;
            this.a = 0;
            try {
                return f(a, b, addHeapObject(arg0));

            } finally {
                if (--this.cnt === 0) d(a, b);
                else this.a = a;

            }

        };
        cb.a = arg0;
        cb.cnt = 1;
        let real = cb.bind(cb);
        real.original = cb;

        return addHeapObject(real);
    };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

