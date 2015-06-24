define([
	"../../src/BackboneGridView"
], function(BackboneGridView){
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
	}],
	grid = new BackboneGridView($("#grid"), collection, columns, {});
	grid.render();
	
	
});