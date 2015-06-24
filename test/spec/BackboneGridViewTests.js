define([
	"BackboneGridView",
	"libs/backbone/backbone",
], function(BackboneGridView, Backbone) {

	var $container;

	beforeEach(function() {
		$container = $('<div class="content">');
		$(document.body).append($container);
	});

	afterEach(function() {
		$container.remove();
		$container = null;
	});


	describe("false", function() {
		it("should be equal to false", function() {
			expect(false).toBe(false);
		});
	});

	describe("render", function() {
		it("should create a new table", function() {
			var columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}],
				gridView = new BackboneGridView($container, new Backbone.Collection([{
						id: 2,
						name: "my row"
					}]), columns);
				gridView.render();
			expect($("tbody tr").length).toBe(1);
		});
	});
	
	describe("sorting", function(){
		it("should sort by name descending", function(){
			var  columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}],
				collection = new Backbone.Collection([{
						id: 2,
						name: "aa"
					},{
						id: 3,
						name: "cc"
					},{
						id: 4,
						name: "bb"
					}], {
						model: Backbone.Model.extend({
							idAttribute: "id"
						})
					});
			var gridView = new BackboneGridView($container, collection, columns, {
				sortBy: function(a, b){
					return (a.get("name") < b.get("name")) ? 1 : ((a.get("name") === b.get("name")) ? 0 : -1);
				}
			});
			gridView.render();
			expect($("tbody tr").length).toBe(3);
			expect($("tbody tr:eq(0)").attr("data-id")).toBe("3");
			expect($("tbody tr:eq(1)").attr("data-id")).toBe("4");
			expect($("tbody tr:eq(2)").attr("data-id")).toBe("2");
		});
	});
	
	describe("filtering", function(){
		it("should filter out names starting with a", function(){
			var  columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}],
				collection = new Backbone.Collection([{
						id: 2,
						name: "aa"
					},{
						id: 3,
						name: "cc"
					},{
						id: 4,
						name: "bb"
					}], {
						model: Backbone.Model.extend({
							idAttribute: "id"
						})
					});
			var gridView = new BackboneGridView($container, collection, columns, {
				filter: function(model){
					return (0 !== model.get("name").indexOf("a"));
				}
			});
			gridView.render();
			expect($("tbody tr").length).toBe(2);
			expect($("tbody tr[data-id='2']").length).toBe(0);
			expect($("tbody tr[data-id='3']").length).toBe(1);
			expect($("tbody tr[data-id='4']").length).toBe(1);
		});
	});
	
	describe("removing a record", function(){
		it("should automatically remove it from the grid", function(){
			var  columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}],
				collection = new Backbone.Collection([{
						id: 2,
						name: "aa"
					},{
						id: 3,
						name: "cc"
					},{
						id: 4,
						name: "bb"
					}], {
						model: Backbone.Model.extend({
							idAttribute: "id"
						})
					});
			var gridView = new BackboneGridView($container, collection, columns);
			gridView.render();
			expect($("tbody tr").length).toBe(3);
			expect($("tbody tr[data-id='2']").length).toBe(1);
			
			// remove #2 from collection
			collection.remove(2);
			expect($("tbody tr").length).toBe(2);
			expect($("tbody tr[data-id='2']").length).toBe(0);
			
		});
	});

});