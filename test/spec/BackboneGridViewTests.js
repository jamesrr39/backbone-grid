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

	describe("render", function() {
		it("should create a new table", function() {
			var columns = [{
					key: "id",
					name: "ID"
				}, {
					key: "name",
					name: "Name"
				}],
				gridView = new BackboneGridView({
					el: $container,
					collection: new Backbone.Collection([{
						id: 2,
						name: "my row"
					}]),
					columns: columns
				});
				gridView.render();
			expect($container.find("tbody tr").length).toBe(1);
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
			var gridView = new BackboneGridView({
				el: $container,
				collection: collection,
				columns: columns,
				sortBy: function(a, b){
					return (a.get("name") < b.get("name")) ? 1 : ((a.get("name") === b.get("name")) ? 0 : -1);
				}
			});
			gridView.render();
			expect($container.find("tbody tr").length).toBe(3);
			expect($container.find("tbody tr:eq(0)").attr("data-id")).toBe("3");
			expect($container.find("tbody tr:eq(1)").attr("data-id")).toBe("4");
			expect($container.find("tbody tr:eq(2)").attr("data-id")).toBe("2");
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
			var gridView = new BackboneGridView({
				el: $container,
				collection: collection,
				columns: columns,
				filter: function(model){
					return (0 !== model.get("name").indexOf("a"));
				}
			});
			gridView.render();
			expect($container.find("tbody tr").length).toBe(2);
			expect($container.find("tbody tr[data-id='2']").length).toBe(0);
			expect($container.find("tbody tr[data-id='3']").length).toBe(1);
			expect($container.find("tbody tr[data-id='4']").length).toBe(1);
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
			var gridView = new BackboneGridView({
				el: $container,
				collection: collection,
				columns: columns,
				filter: function(){
					return true;
				}
			});
			gridView.render();
			expect($container.find("tbody tr").length).toBe(3);
			expect($container.find("tbody tr[data-id='2']").length).toBe(1);

			// remove #2 from collection
			collection.remove(2);
			expect($container.find("tbody tr").length).toBe(2);
			expect($container.find("tbody tr[data-id='2']").length).toBe(0);

		});
	});

	describe("adding a record", function(){
		it("should automatically add it to the grid", function(){
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
			var gridView = new BackboneGridView({
				el: $container,
				collection: collection,
				columns: columns});
			gridView.render();
			expect($container.find("tbody tr").length).toBe(3);

			// remove #2 from collection
			collection.add({
				id: 5,
				name: "new"
			});
			expect($container.find("tbody tr").length).toBe(4);
			expect($container.find("tbody tr[data-id='5']").length).toBe(1);

		});
	});

	describe("changing a record", function(){
		it("should automatically change it in the grid", function(){
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
			var gridView = new BackboneGridView({
				el: $container,
				collection: collection,
				columns: columns
			});
			gridView.render();
			expect($container.find("tbody tr").length).toBe(3);

			// remove #2 from collection
			collection.get(3).set("name", "new name");
			expect($container.find("tbody tr").length).toBe(3);
			expect($.trim($container.find("tbody tr[data-id='3'] td:eq(1)").text())).toBe("new name");

		});
	});

});
