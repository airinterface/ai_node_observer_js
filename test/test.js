( function(){
  function testAll(){
    QUnit.test("Example Test Category", function(assert){

      var AINodeObserver = com.ai.NodeObserver;
      var $ai            = com.ai.NodeSelector.$ai;
      var _observer      = new AINodeObserver();
      let a = _observer.createKey(".myclass1", "mycalss2 > test");
      let b = _observer.createKey(".myclass1", "mycalss2 > test");
      assert.ok( ( a != b ) , 'Key (a = ' + a + ' is not equals to key (b = ' + b );
      var node           = $ai( '#test' );
      var config         = {};
      var count          = 0;
      _observer.observe( '#test', ".child", config, function(){
        count++;
        var el = $ai("#result").get(0)
        el.innerHTML = 'count = ' + count;
      });
      var para = document.createElement("p");
      let parentEl  = $ai("#test").get(0);
      parentEl.appendChild( para );
    });
  };
  testAll();
}).call(this);