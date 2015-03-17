define([
	"libs/mustache/mustache.min.js",
	"text!./BackboneGridRowTemplate.html",
	"text!./BackboneGridTemplate.html"
], function(Mustache, BackboneGridRowTemplate, BackboneGridTemplate) {
	"use strict";
	return Backbone.View.extend({
		gridTemplate: BackboneGridTemplate,
		rowTemplate: BackboneGridRowTemplate,
		events: {
			"click [data-bgv-action='archive']": "archive"
		},
		defaults: function(){
			var self = this;

			return {
				sortBy: function(){
					return self.collection.sortBy(self.collection.model.idAttribute);
				},
				getModelData: function(model){
					return _.extend(model.toJSON(), {
						id: model.id
					});
				}
			};
		},
		initialize: function(options) {
			options = options || {};
			this.options = _.extend(this.defaults(), options);
			this.getHeadings = _.isFunction(options.getHeadings) ? options.getHeadings : this.getHeadings;
			this.getData = _.isFunction(options.getData) ? options.getData : this.getData;
			this.rowTemplate = options.rowTemplate ? options.rowTemplate : this.rowTemplate;
			this.allowDelete = options.allowDelete ? options.allowDelete : this.allowDelete;

			this.collection.on("add", function(model) {
				this.renderRows();
			}, this);
			this.collection.on("remove", function(model) {
				this.removeRow(model.id);
			}, this);
		},
		render: function() {
			var self = this;
			this.$el.html(Mustache.render(this.gridTemplate, {
				headings: self.getHeadings()
			}));
			this.renderRows();
		},
		renderRows: function(){
			var self = this,
					html = [];
			_.each(this.getData(this.collection), function(data){
				html.push(self.getRowHtml(data));
			});
			this.$("tbody").html(html.join(""));
		},
		getRowHtml: function(data) {
			return Mustache.render(this.rowTemplate, data);
		},
		removeRow: function(id) {
			this.$("tr[data-id='" + id + "']").remove();
		},
		archive: function(event){
			var modelId = $(event.target).closest("tr").attr("data-id");
			this.collection.get(modelId).set("archived", true);
		}
	});
});