define([
	"../mocks/MockSmallCollection",
	"text!../mocks/HandlebarsRowTemplate.html",
	"handlebars",
	"BackboneGridView"
], function(MockSmallCollection, HandlebarsRowTemplate, Handlebars, BackboneGridView){
	"use strict";
	
	var $container;
	
	beforeEach(function() {
		$container = $(document.createElement("div"));
	});

	afterEach(function() {
		$container.remove();
	});
	
	describe("handlebars template engine", function(){
		it("should be possible to use a compiled handlebars template as a rowTemplate", function(){
			var  columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}];
			
			var gridView = new BackboneGridView({
				rowTemplate: Handlebars.compile(HandlebarsRowTemplate),
				el: $container,
				collection: new MockSmallCollection(),
				columns: columns,
				filter: function(model){
					return (0 !== model.get("name").indexOf("a"));
				}
			});
			gridView.render();
			
			var expectedNumberOfShownRows = 2;
			expect($container.find("tbody tr").length).toBe(expectedNumberOfShownRows);
			expect($container.find("tbody tr[data-id='2']").length).toBe(0);
			expect($container.find("tbody tr[data-id='3']").length).toBe(1);
			expect($container.find("tbody tr[data-id='4']").length).toBe(1);
			expect($container.find(".handlebarsRowTemplate").length).toBe(expectedNumberOfShownRows);
		});
	});
});

