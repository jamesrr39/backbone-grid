define([
	"./libs/mustache/mustache",
	"text!./BackboneGridRowTemplate.html",
	"text!./BackboneGridTemplate.html"
], function(Mustache, BackboneGridRowTemplate, BackboneGridTemplate) {
	"use strict";

	/**
	 * 
	 * @param {HTMLElement} element grid container
	 * @param {Backbone.Collection} collection
	 * @param {array} columns list of columns in the order they should be shown. Should be a list of objects with the keys: <code>key</code> (field in the backbone models) and <code>name</code> presentation name
	 * @param {object} options extra options. See <code>_.extend(options, {...})</code> further down for a list of options and defaults.
	 * @example see /examples folder
	 * @returns {object} instantiated BackboneGridView
	 */
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
				records = collection.filter(options.filter).sort(options.sortBy);
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
			 * for sorting
			 * @param {Backbone.Model} a
			 * @param {Backbone.Model} b
			 * @returns {Number} 0 if equal, -1 if a should be shown before b, 1 if b should be shown before a
			 */
			sortBy: function(a, b) {
				if(a.get(a.id) < b.get(b.id)){
					return -1;
				} else if(a > b){
					return 1;
				}
				return 0;
			},
			/**
			 * 
			 * @param {Backbone.Model} model
			 * @returns {Boolean} true if it should be shown, false if it should be hidden
			 */
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

		collection.on("add change", function(model) {
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
