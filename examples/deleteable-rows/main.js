define([
	"handlebars",
	"BackboneGrid/BackboneGridView",
	"text!./rowTemplate.html"
], function(Handlebars, BackboneGridView, rowTemplate){
	"use strict";

	var collection = new Backbone.Collection([{
		id: 1,
		text: "some text 1"
	}, {
		id: 2,
		text: "some text 2"
	}]),
	columns = [{
		key: "id",
		name: "ID"
	}, {
		key: "text",
		name: "Text"
	}, {
		name: "Actions"
		// key field empty as there is no data; just the delete column
	}],
	GridView = BackboneGridView.extend({
		events: {
			"click .delete": "clickDelete"
		},
		clickDelete: function(event){
			var id = $(event.currentTarget).closest("tr").attr("data-id");
			event.preventDefault();
			collection.remove(id);
		}
	}),
	grid = new GridView({
		el: $("#grid"),
		collection: collection,
		columns: columns,
		rowTemplate: Handlebars.compile(rowTemplate)
	});
	grid.render();


});
