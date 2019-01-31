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
  const AObject  = com.ai.AObject;
  const Util     = com.ai.Util;
  const $ai      = com.ai.NodeSelector.$ai;
  
  var NodeObserver = AObject.extends( 
    { 
      /* instance methods & variables 
       *   NodeObserver.requestReference keep records of how many requestKeys per observer
      */
      __name__               : "NodeObserver",
      _defaultOptions        : {
        attributesChange: false, 
        nodeChange      : false
        },
      _defaultObserverConfig : 
        { 
          attributes: true, 
          childList: true, 
          subtree: true
        },
      listenToAttributeChange: false,
      watchNodeSelector: null,
      typeAdded        : "addedChecked",
      observerConfigKey: "observerConfig",
      requestKey: null, 
      parentId: null, 
      rootNode: null,
      once: false,

      constructor: function( node, selector, config,  context ){
        this.config   = config || {};
        /* It listen to attributes Change */
        this.listenToAttributeChange = ( this.config.listenToAttributeChange  || false );
        /* It listen to node Change */
        this.watchNodeSelector       = ( this.config.watchNodeSelector || null );
        this.checkNodeChange         = this.watchNodeSelector != null;
        /* once event happens, it stopps listning */
        this.once                    = false;  
        this.rootNode = node; 
        this.context  = context || this;
        this.observer = null;
        this.observerConfig = {};
        for( var k in this._defaultObserverConfig ){
          this.observerConfig[ k ] = this._defaultObserverConfig[k];
        }
        if( !this.listenToNodeChange ) {
          this.observerConfig['attributes'] = false;
        }
        
        this.initializeObserver();
        this.start();
      },

      setRequestKey: function( requestKey ){
        this.requestKey = requestKey;
      },

      getReqeustKey: function(){
        return this.requestKey;
      },
      

      setParentId: function( parentId ){
        this.parentId = parentId;
      },

      getParentId: function(){
        return this.parentId;
      },

      start: function() {
        this.observer.observe( this.rootNode, this.observerConfig );
      },
      
      stop: function(){
        this.observer.disconnect();
      },

      initializeObserver: function(){
        var that = this;
        this.observer = new MutationObserver( this.handleNodeChange.bind(this) );
      },

      handleNodeChange: function( mutationList, observer ){
        for(var mutation of mutationList) {
            if ( mutation.type == 'childList' && 
                 mutation.addedNodes.length >= 0 && 
                 this.checkNodeChange ) {
              let nodeList = this.rootNode.querySelectorAll( this.watchNodeSelector );
              nodeList.forEach( function( node ){
                if( !this.isChecked( node, this.typeAdded ) ){
                  this.checkNode( node, this.typeAdded );
                  this.callIfApply( 'add', node );
                }
                console.log('A child node has been added or removed.');
              }.bind(this));
            }
            else if (mutation.type == 'attributes') {
                console.log('The ' + mutation.attributeName + ' attribute was modified.');
            }
        }
      },

      isChecked : function( node, type ) {
        return ( !!node[type] && !!( node[ type ] = ( node[ type ] || {} ))[ this.requestKey ] );
      },

      checkNode: function( node, type ) {
        ( node[ type ] = {} )[ this.requestKey ] = true;
      },
      callIfApply: function( updateType, node ){
        var _callback = null;
        switch( updateType ){
          case 'add': 
            _callback = 'addedCallback';
            break;
          case 'remove': 
            _callback = 'updateCallback';
            break;
          case 'udate': 
            _callback = 'updateCallback';
            break;
        }
        if( _callback != null  && this.config[ _callback ] != null ) {
          let args = Array.from( arguments ).splice(1);
          this.config[ _callback ].apply( this.context, args );
        }
      },
    },
    {
      observerList       : {},
      observerKey        : "__observer__",
      observerRequestHeader: "ai_observer_",
      requestReference: {},
      observe: function( parentSelector, selector, config, addedCallback, changedCallback, removedCallback, context ) {
        var _config     =  ( config || {} );
        var elms        = $ai( parentSelector ).get();
        var res         = null;
        var parentId    = this.getParentNamespace( parentSelector );
        _config['watchNodeSelector'] = selector;
        _config['addedCallback']     = ( addedCallback  || null );
        _config['changedCallback']   = ( changedCallback  || null );
        _config['removedCallback']   = ( removedCallback  || null );
        
        /* create request key that caller can refer to */
        var requestKey = this.createRequestKey( parentId, selector );

        elms.forEach( function( el ) {
          let observer = this.createObserver( requestKey, el, selector, _config, context);
          observer.start();
        }.bind(this));

        res = new  ObserverMonitor( requestKey );
        return res;
      },

      unobserve: function( observerMonitor ) {
        var requestKey = observerMonitor.requestKey; 
        var observerMap = this.getObserverSlot( requestKey, false ); 
        var observer, key;
        if( observerMap != null ){
          let keys = Object.keys( observerMap );
          for( var i = 0; i < keys.length; i++ ) {
            key      = keys[i];
            observer = observerMap[ key ];
            this.unregisterObserver( observer );
            observer.stop();
          }
        }
      },

      
      /**
       * Once it's loaded, it will call callback. 
       * if once parameter is true, it will stop listening once it's loaded. 
       *
       * @param      {Node}    parentNode  The parent node
       * @param      {String}    selector    The selector
       * @param      {Function}  callback    The callback
       * @param      {boolean}   once        The once
       */
      onLoad: function( parentNode, selector, callback, once = false ) {
        var res = null;
        var _callback = ( callback || null );
        var processCallback = function(){
          if( once == true ) {
            res.unobserve();
          }
          if( _callback != null ) {
            _callback.apply( this, arguments );
          }
        };
        res = this.observe( parentNode, selector, {}, processCallback, null, null , this);
        return res;
      },


      markNode: function( node, requestKey )  {
        var tmpKey =  node.getAttribute( this.observerKey ) || null;
        if( tmpKey == null ){
          tmpKey = this.uniqueId('ai_obsvr_')
          this.requestReference[ tmpKey ] = [];
          node.setAttribute( this.observerKey, tmpKey );
        }
        this.requestReference[tmpKey].push( requestKey );
        return tmpKey;
      },

      getParentNamespace : function( parentSelectorOrNode ){
        var res = ( typeof parentSelector === 'string') ? parentId : this.uniqueId( '_observer_parent_' );
        return res;
      },

      unmarkNode: function( node, requestKey ){
        var res    = null;
        var tmpKey =  node.getAttribute( this.observerKey ) || null;
        if( tmpKey != null ){
          let i = this.requestReference[tmpKey].indexOf( requestKey );
          if( i >= 0 ) {
            res = this.requestReference[tmpKey].splice( i, 1 )[0];
            if( this.requestReference.length = 0 ) {
              node.removeAttribute( tmpKey );
              this.requestReference[ tmpKey ] = null;
              delete this.requestReference[ tmpKey ];
            }
          }
        }
        return res;
      },
      
      createObserver: function( requestKey, node, selector, config,  context ) {
        var observer            = new NodeObserver( node, selector, config, context );
        this.registerObserver( requestKey, node, observer );
        observer.start();
        return observer; 
      },

      /* register observer to the NSNodeObserver so that it can clean up when node is cleaned */
      registerObserver: function( requestKey, el, observer ) {
        var parentId     = this.markNode( el, requestKey );
        observer.setRequestKey( requestKey );
        observer.setParentId( parentId );
        let slot         = this.getObserverSlot( requestKey, true );
        slot[ parentId ] = observer;
      },

      unregisterObserver: function( observer ) {
        this.unmarkNode( observer.rootNode, observer.requestKey );
        let parentId = observer.getParentId();
        let slot     = this.getObserverSlot( observer.getReqeustKey(), false );
        if(  slot != null && ( observer = ( slot[ parentId ] || null )) != null ){
          delete slot[ parentId ];
        }
      },


      /* in each observerList, requestKey is the key */ 
      getObserverSlot: function( requestKey, forceCreate ) {
        var requestSlot =  ( this.observerList[ requestKey ] || null );
        if( requestSlot == null && forceCreate === true ) {
          requestSlot = this.observerList[ requestKey ] = {}
        }
        return requestSlot;
      },



      createRequestKey: function( parentSelector, selector ) {
        return this.createKey( parentSelector, selector );
      },
      
      getNameSpace: function( _parentSelector, _selector ) {
        var ns = _parentSelector.replace(" ", "_") + 
                  _selector.replace(" ", "_");
        return ns;


      },

      createKey  : function( _parentSelector, _selector ) {
        var key = this.uniqueId( this.observerRequestHeader ) + "_" + this.getNameSpace( _parentSelector, _selector );
        return key 
      },

      makeKey : function( key ) {
        return key.replace(/\s+/g, "_");
      }

      /* static methods & variables */
    }
  );

  var ObserverMonitor  = AObject.extends({
    __name__  : "ObserverMonitor",
    requestKey:  null,
    constructor: function( requestKey ) {
      this.requestKey  = requestKey;
      this.cid         = this.uniqueId("observer_");
    },
    unobserve: function(){
      return NodeObserver.unobserve( this );
    }
  },{
  });

  this.NodeObserver = NodeObserver; 
}).call( com.ai );

/*** EXPORTS FROM exports-loader ***/
exports["com"] = (com);
}.call(window));

/***/ })
/******/ ]);