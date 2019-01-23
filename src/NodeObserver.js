'use strict';
( function(){
  var  AObject = com.ai.AObject;
  
  var NodeObserver = AObject.extends( 
    { 
      /* instance methods & variables */
      __name__       : "NodeObserver",
      observerList   : {},
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
        var elms     = $ai( parentSelector );
        for( var i in elms ) {
          parentEl
        }

        var observer = new NodeObserverCallbackWrapper();
        var key      = createEntry( parentSelector, selector );
        observer.observe( parentNode, ( config.observeConfig || {} ) );
        this.addObserver( key, observer );
        return key;
      },

      start: function(){
      }

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

  var ObserverObject = AObject.extends({
    __name__ : "NodeObserverCallbackWrapper",
    _defaultConfig : 
      { 
        attributes: true, 
        childList: true, 
        subtree: true
      },

    constructor: function( node, config,  callback, context ) {
      this.callback = callback;
      this.context  = context || this;
      this.selector = selector;
      this.observer = null;
      this.observerConfig = {};
    },

    start: function(){
      this.observer.observer( )
    },
    initializeObserver: function(){
      var that = this;
      this.observer = new MutationObserver( this.processIfApply );
    }

    processIfApply: function( node ){
      
    }
  },
  {
  })
  window.NodeObserver = NodeObserver; 
}).call(this);