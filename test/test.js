( function(){
  var count = 0;

  var testItem = function() {
    jQuery("#test").append("<div class='item' > item " + count + " </div>");
  };

  var testItem2 = function() {
    jQuery("#test .subclass").append("<div class='item' > item " + count + " </div>");
  };
  


  function testAll(){
    var NodeObserver  = com.ai.NodeObserver;
      
    QUnit.test("Requestkey Creation", ( assert ) => {
      let key = NodeObserver.createRequestKey("#test", ".list");
      assert.ok( ( key.startsWith( NodeObserver.observerRequestHeader) ), 'Creating Request key' );

    });

    QUnit.test("Example Test Category", function(assert){
      assert.expect( 4 );
      var done = assert.async(5);
      var update = () => {
          count++;
          var el = jQuery("#result").get(0);
          el.innerHTML = 'count = ' + count;
      };
      var callback      = ()=> {
          update();
          assert.ok( ( count == 1 ), 'observation successful.' )
          done();
        };

      var callback2      = ()=> {
          update();
          assert.ok( ( count == 2 ), 'observation successful.' )
          done();
        };

      var callback3      = ()=> {
          update();
          assert.ok( ( count == 3 ), 'observation successful.' )
          let attrKey      = jQuery("#test").attr( NodeObserver.observerKey )
          let observerSize = NodeObserver.requestReference[ attrKey ].length 
          assert.ok( ( observerSize == 2 ), 'unobservation successful.' )
          done();
        };

      NodeObserver.observe(jQuery( "#test" ).get(0), ".item", null, callback );
      NodeObserver.onLoad("#test", ".item", callback2, false );
      NodeObserver.onLoad("#test", ".item", callback3, true );
      testItem2();

    });
  };
  testAll();


}).call(this);