define([
	"text!./BackboneGridTemplate.html",
	"backbone"
], function(BackboneGridTemplate, Backbone) {
	"use strict";
	
	/**
	 * commonly customised methods that can be changed without extending the view
	 */
	var defaultOptions = {
		/**
		 * Function that takes model data and builds (and returns) an HTML representation of the table row
		 * This can be overwridden with compiled templates from other template engines, such as Handlebars
		 * @see https://github.com/jamesrr39/backbone-grid/blob/master/test/spec/OtherTemplateEngineTests.js
		 * @param {object} data map of attributes to be used for building the row HTML
		 * @param {array} columns array of fields. each element requires a <code>key</code>
		 * @param {string} idAttribute the idAttribute as used by the Backbone Model. Added as an attribute (<code>data-id</code>) to the row <code>tr</code> element
		 * @returns {string} HTML representation of a row of the table
		 */
		rowTemplate: function(data, columns, idAttribute){
			var dataIdAttribute = idAttribute ? "data-id='" + _.escape(data[idAttribute]) + "'" : "";
			return [
				"<tr " + dataIdAttribute + ">",
				_.map(columns, function(column){
					return "<td>" + _.escape(data[column.key]) + "</td>";
				}),
				"</tr>"
			].join("");
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
		}
	};

	return Backbone.View.extend({
			gridTemplate: BackboneGridTemplate,
			initialize: function(options){
    		this.options = _.extend(defaultOptions, options);
				this.collection.on("add change", function(model) {
					this.renderRows();
				}, this);
				this.collection.on("remove", function(model) {
					this.removeRow(model.id);
				}, this);
			},
			render: function(){
				var $tableHeader;
				this.$el.html(this.gridTemplate);
				$tableHeader = this.$("thead tr");
				$tableHeader.html(_.map(this.getHeadings(), function(header){
					return "<th>" + _.escape(header) + "</th>";
				}).join(""));
				this.renderRows();
			},
			getHeadings: function(){
				return _.pluck(this.options.columns, "name");
			},
			renderRows: function() {
				var self = this,
					records = this.collection.chain()
						.filter(this.options.filter)
						.sort(this.options.sortBy)
						.map(function(model){
							return self.options.rowTemplate(
								model.toJSON(),
								self.options.columns,
								model.idAttribute
							);
						})
						.value();

				this.$("tbody").html(records.join(""));
			},
			removeRow: function(id) {
				this.$("tr[data-id='" + id + "']").remove();
			}
	});
});
