/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".bootstrap.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"./pkg/ruffle_bg.wasm": function() {
/******/ 			return {
/******/ 				"./ruffle": {
/******/ 					"__wbindgen_is_undefined": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_is_undefined"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_string_new"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_object_clone_ref": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_object_clone_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_object_drop_ref"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_cb_forget": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_cb_forget"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_cb_drop": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_cb_drop"](p0i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_error_4bb6c2a97407129a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_new_59cb74e423758ede"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_stack_558ba5917b466edd"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_instanceof_AudioBuffer": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_instanceof_AudioBuffer"](p0i32);
/******/ 					},
/******/ 					"__widl_f_copy_to_channel_AudioBuffer": function(p0i32,p1i32,p2i32,p3i32,p4i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_copy_to_channel_AudioBuffer"](p0i32,p1i32,p2i32,p3i32,p4i32);
/******/ 					},
/******/ 					"__widl_f_length_AudioBuffer": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_length_AudioBuffer"](p0i32);
/******/ 					},
/******/ 					"__widl_f_start_AudioBufferSourceNode": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_start_AudioBufferSourceNode"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_buffer_AudioBufferSourceNode": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_buffer_AudioBufferSourceNode"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_new_AudioContext": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_new_AudioContext"](p0i32);
/******/ 					},
/******/ 					"__widl_f_create_buffer_AudioContext": function(p0i32,p1i32,p2i32,p3f32,p4i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_create_buffer_AudioContext"](p0i32,p1i32,p2i32,p3f32,p4i32);
/******/ 					},
/******/ 					"__widl_f_create_buffer_source_AudioContext": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_create_buffer_source_AudioContext"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_decode_audio_data_AudioContext": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_decode_audio_data_AudioContext"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_destination_AudioContext": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_destination_AudioContext"](p0i32);
/******/ 					},
/******/ 					"__widl_f_connect_with_audio_node_AudioNode": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_connect_with_audio_node_AudioNode"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_set_property_CSSStyleDeclaration": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_property_CSSStyleDeclaration"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__widl_instanceof_CanvasRenderingContext2D": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_instanceof_CanvasRenderingContext2D"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_global_alpha_CanvasRenderingContext2D": function(p0i32,p1f64) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_global_alpha_CanvasRenderingContext2D"](p0i32,p1f64);
/******/ 					},
/******/ 					"__widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D": function(p0i32,p1i32,p2f64,p3f64,p4i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D"](p0i32,p1i32,p2f64,p3f64,p4i32);
/******/ 					},
/******/ 					"__widl_f_set_fill_style_CanvasRenderingContext2D": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_fill_style_CanvasRenderingContext2D"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_filter_CanvasRenderingContext2D": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_filter_CanvasRenderingContext2D"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_fill_rect_CanvasRenderingContext2D": function(p0i32,p1f64,p2f64,p3f64,p4f64) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_fill_rect_CanvasRenderingContext2D"](p0i32,p1f64,p2f64,p3f64,p4f64);
/******/ 					},
/******/ 					"__widl_f_reset_transform_CanvasRenderingContext2D": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_reset_transform_CanvasRenderingContext2D"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_set_transform_CanvasRenderingContext2D": function(p0i32,p1f64,p2f64,p3f64,p4f64,p5f64,p6f64,p7i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_transform_CanvasRenderingContext2D"](p0i32,p1f64,p2f64,p3f64,p4f64,p5f64,p6f64,p7i32);
/******/ 					},
/******/ 					"__widl_f_create_element_ns_Document": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_create_element_ns_Document"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__widl_f_body_Document": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_body_Document"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_attribute_Element": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_attribute_Element"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32);
/******/ 					},
/******/ 					"__widl_f_set_attribute_ns_Element": function(p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32,p7i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_attribute_ns_Element"](p0i32,p1i32,p2i32,p3i32,p4i32,p5i32,p6i32,p7i32);
/******/ 					},
/******/ 					"__widl_f_get_context_HTMLCanvasElement": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_get_context_HTMLCanvasElement"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__widl_f_width_HTMLCanvasElement": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_width_HTMLCanvasElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_width_HTMLCanvasElement": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_width_HTMLCanvasElement"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_height_HTMLCanvasElement": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_height_HTMLCanvasElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_height_HTMLCanvasElement": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_height_HTMLCanvasElement"](p0i32,p1i32);
/******/ 					},
/******/ 					"__widl_f_style_HTMLElement": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_style_HTMLElement"](p0i32);
/******/ 					},
/******/ 					"__widl_f_new_Image": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_new_Image"](p0i32);
/******/ 					},
/******/ 					"__widl_f_set_src_HTMLImageElement": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_set_src_HTMLImageElement"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_append_child_Node": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_append_child_Node"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_now_Performance": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_now_Performance"](p0i32);
/******/ 					},
/******/ 					"__widl_instanceof_Window": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_instanceof_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_cancel_animation_frame_Window": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_cancel_animation_frame_Window"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_request_animation_frame_Window": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_request_animation_frame_Window"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__widl_f_document_Window": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_document_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_performance_Window": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_performance_Window"](p0i32);
/******/ 					},
/******/ 					"__widl_f_debug_1_": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_debug_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_error_1_": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_error_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_info_1_": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_info_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_log_1_": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_log_1_"](p0i32);
/******/ 					},
/******/ 					"__widl_f_warn_1_": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__widl_f_warn_1_"](p0i32);
/******/ 					},
/******/ 					"__wbg_slice_323e1b9b1a0da609": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_slice_323e1b9b1a0da609"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_newnoargs_cfdef9286cf1c39a": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_newnoargs_cfdef9286cf1c39a"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_call_8ff1b6c7fba4f641": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_call_8ff1b6c7fba4f641"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_new_bf3cfee10b530d04": function() {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_new_bf3cfee10b530d04"]();
/******/ 					},
/******/ 					"__wbg_then_5af048b9dddc6938": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_then_5af048b9dddc6938"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_08d38e5dfd7e3d56": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_new_08d38e5dfd7e3d56"](p0i32);
/******/ 					},
/******/ 					"__wbg_newwithbyteoffsetandlength_5b96dc74937deaa9": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_newwithbyteoffsetandlength_5b96dc74937deaa9"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_buffer_33fdc469b57681b3": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_buffer_33fdc469b57681b3"](p0i32);
/******/ 					},
/******/ 					"__wbg_length_b9139c923a800ec5": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_length_b9139c923a800ec5"](p0i32);
/******/ 					},
/******/ 					"__wbg_byteLength_e5f39ddf6289b62c": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_byteLength_e5f39ddf6289b62c"](p0i32);
/******/ 					},
/******/ 					"__wbg_byteOffset_ecbf7be82687da03": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_byteOffset_ecbf7be82687da03"](p0i32);
/******/ 					},
/******/ 					"__wbg_set_8e698fb96853c911": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_set_8e698fb96853c911"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_get_9fe15aed09afbe22": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_get_9fe15aed09afbe22"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbg_set_03fa0158ee424157": function(p0i32,p1i32,p2i32,p3i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_set_03fa0158ee424157"](p0i32,p1i32,p2i32,p3i32);
/******/ 					},
/******/ 					"__wbg_buffer_def0e610ddffa53c": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbg_buffer_def0e610ddffa53c"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_debug_string": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_debug_string"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_throw"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_rethrow": function(p0i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_rethrow"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_memory": function() {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_memory"]();
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper3103": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_closure_wrapper3103"](p0i32,p1i32,p2i32);
/******/ 					},
/******/ 					"__wbindgen_closure_wrapper3105": function(p0i32,p1i32,p2i32) {
/******/ 						return installedModules["./pkg/ruffle.js"].exports["__wbindgen_closure_wrapper3105"](p0i32,p1i32,p2i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"1":["./pkg/ruffle_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"./pkg/ruffle_bg.wasm":"b1a8a30505f80832bb8e"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./www/bootstrap.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/bootstrap.js":
/*!**************************!*\
  !*** ./www/bootstrap.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// A dependency graph that contains any wasm must all be imported\n// asynchronously. This `bootstrap.js` file does the single async import, so\n// that no one else needs to worry about it again.\nPromise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./index.js */ \"./www/index.js\"))\n  .catch(e => console.error(\"Error importing `index.js`:\", e));\n\n\n//# sourceURL=webpack:///./www/bootstrap.js?");

/***/ })

/******/ });