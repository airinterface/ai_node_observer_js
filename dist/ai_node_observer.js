/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*** IMPORTS FROM imports-loader ***/
(function() {

'use strict';
( function(){
  var  AObject = com.ai.AObject;
  
  var NodeObserver = AObject.extends( 
    { 
      /* instance methods & variables */
      __name__       : "NodeObserver",
      observerList   : {},
      _defaultConfig : 
        { 
          attributes: true, 
          childList: true, 
          subtree: true
        }, 
      constructor: function(){
        this.observerList = {};
      },

      applyCallback: function( mutationList, observer ) {
        for(var mutation of mutationsList) {
            if (mutation.type == 'childList') {
                console.log('A child node has been added or removed.');
            }
            else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
      },

      observe: function( parentSelector, selector, config, callback ) {
        var _config  =  ( config || {} );
        var observer = new MutationObserver( this.applyCallback.bind(this) );
        var key      = createEntry( parentSelector, selector );
        observer.observe( parentNode, ( config.observeConfig || {} ) );
        this.addObserver( key, observer );
        return key;
      },

      addObserver: function( key, observer ) {
        this.observerList[key] = observer;
      },

      unObserve: function ( ){
      },

      createEntry: function( parentSelector, selector ) {
        this.createKey( parentSelector, selector );
      },

      createKey  : function( _parentSelector, _selector ) {
        var key = _parentSelector.replace(" ", "_") + 
                  _selector.replace(" ", "_") + 
                  this.uniqueId("ai_observer_");
        return key 
      },

      makeKey : function( key ) {
        return key.replace(/\s+/g, "_");
      },

      uniqueId : function( header ) {
        return header + NodeObserver.uniqueID++;
      }
    },
    {
      uniqueID: 1,

      /* static methods & variables */
    }
  );

  var NodeObserverCallbackWrapper = AObject.extends({
    __name__ : "NodeObserverCallbackWrapper"
    constructor: function( selector, callback, context ) {
      this.callback = callback;
      this.context  = context || this;
      this.selector = selector;
    },

    processIfApply: function( node ){
      
    }
  },
  {
  })
  window.NodeObserver = NodeObserver; 
}).call(this);

/*** EXPORTS FROM exports-loader ***/
exports["com"] = (com);
}.call(window));

/***/ })
/******/ ]);