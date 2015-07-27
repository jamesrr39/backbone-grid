define([
	"BackboneGridView",
	"libs/backbone/backbone"
], function(BackboneGridView, Backbone) {

	var $container;

	beforeEach(function() {
		$container = $(document.createElement("div"));
	});

	afterEach(function() {
		$container.remove();
	});


	describe("element", function() {
		it("should exist", function() {
			expect($container.length).toBe(1);
		});
	});

  describe("XSS injection", function(){
    it("should be prevented by escaping html entities", function(){

      var vunerableCodeSnippet = "<script type='text/javascript'>window.isVunerable = true;</script>",
      collection = new Backbone.Collection([{
        id: vunerableCodeSnippet,
        text: vunerableCodeSnippet
      }])
      var grid = new BackboneGridView({
        el: $container,
        collection: collection,
        columns: [{
          key: "id",
          name: "ID"
        },{
          key: "text",
          name: "Text"
        }]
      });
      grid.render();
      expect(typeof window.isVunerable).toBe("undefined");
      expect(grid.$("tbody tr").length).toBe(1);
      expect($.trim(grid.$("tbody td")[0].innerText)).toBe(vunerableCodeSnippet);
      expect($.trim(grid.$("tbody td")[1].innerText)).toBe(vunerableCodeSnippet);

    })
  })


});
