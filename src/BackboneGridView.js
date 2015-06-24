define([
	"./libs/mustache/mustache",
	"text!./BackboneGridRowTemplate.html",
	"text!./BackboneGridTemplate.html"
], function(Mustache, BackboneGridRowTemplate, BackboneGridTemplate) {
	"use strict";

	return function(element, collection, columns, options) {

		var render = function() {
			$(element).html(Mustache.render(options.gridTemplate, {
				headings: options.getHeadings()
			}));
			renderRows();
		},
		generateRowHtml = function(data) {
			return Mustache.render(options.rowTemplate, data);
		},
		removeRow = function(id) {
			$(element).find("tr[data-id='" + id + "']").remove();
		},
		renderRows = function() {
			var html,
				records = collection.filter(function(model){
					return true;
				})
				.sort(options.sortBy);
			html = _.map(records, function(model) {
				return generateRowHtml({
					id: model.id,
					data: _.map(columns, function(column){
						return model.get(column.key);
					})
				});
			}).join("");
			$(element).find("tbody").html(html);
		};


		options = _.extend({
			gridTemplate: BackboneGridTemplate,
			rowTemplate: BackboneGridRowTemplate,
			/**
			 * 
			 * @param {Backbone.Model} a
			 * @param {Backbone.Model} b
			 * @returns {Number}
			 */
			sortBy: function(a, b) {
				if(a.get(a.id) < b.get(b.id)){
					return -1;
				} else if(a > b){
					return 1;
				}
				return 0;
			},
			filter: function(model) {
				return true;
			},
			/**
			 * Get the column titles
			 * By default take the field from the first model, or take an empty array if no first field
			 * @returns {Array}
			 */
			getHeadings: function() {
				return _.pluck(columns, "name");
			},
			getData: function() {
				return collection.toJSON();
			}
		}, options);

		collection.on("add", function(model) {
			renderRows();
		}, this);
		collection.on("remove", function(model) {
			removeRow(model.id);
		}, this);

		return {
			render: render
		};
	};

});
