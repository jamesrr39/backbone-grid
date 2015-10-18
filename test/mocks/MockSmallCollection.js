define([
	"backbone"
], function(Backbone) {
	"use strict";

	return function() {
		return new Backbone.Collection([{
				id: 2,
				name: "aa"
			}, {
				id: 3,
				name: "cc"
			}, {
				id: 4,
				name: "bb"
			}], {
			model: Backbone.Model.extend({
				idAttribute: "id"
			})
		});
	};
});