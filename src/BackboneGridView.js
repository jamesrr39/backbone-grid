define([
	"./libs/handlebars/handlebars",
	"text!./BackboneGridRowTemplate.html",
	"text!./BackboneGridTemplate.html"
], function(Handlebars, BackboneGridRowTemplate, BackboneGridTemplate) {
	"use strict";

	/**
	 * commonly customised methods that can be changed without extending the view
	 */
	var defaultOptions = {
		rowTemplate: BackboneGridRowTemplate,
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
		},
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
				var template = Handlebars.compile(this.gridTemplate);
				this.$el.html(template({
					headings: this.getHeadings()
				}));
				this.renderRows();
			},
			getHeadings: function(){
				return _.pluck(this.options.columns, "name");
			},
			renderRows: function() {
				var html,
					self = this,
					records = this.collection.filter(this.options.filter).sort(this.options.sortBy),
					template = Handlebars.compile(this.options.rowTemplate);

				html = _.map(records, function(model) {
					var data = {};
					_.each(_.pluck(self.options.columns, "key"), function(key){
						data[key] = model.get(key);
					});

				 	return template({
						id: model.id,
						data: data
					});
				}).join("");
				this.$("tbody").html(html);
			},
			removeRow: function(id) {
				this.$("tr[data-id='" + id + "']").remove();
			}
	});
});
