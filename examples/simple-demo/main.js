define([
	"BackboneGrid/BackboneGridView"
], function(BackboneGridView){
	"use strict";

	var collection = new Backbone.Collection([{
		id: 1,
		text: "some text 1"
	}, {
		id: 2,
		text: "some text 2"
	}]);

	var columns = [{
		key: "id",
		name: "ID"
	}, {
		key: "text",
		name: "Text"
	}];

	var grid = new BackboneGridView({
		el: $("#grid"),
		collection: collection,
		columns: columns
	});

	grid.render();

});
