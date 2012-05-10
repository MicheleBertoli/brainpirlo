
var Todo = Backbone.Model.extend({
	idAttribute: "_id",
	defaults: {
		title: "",
		done: false
	}
});

var Todos = Backbone.Collection.extend({
	model: Todo,
	url: "/todos"
});

$(function() {

	var AppView = Backbone.View.extend({
		el: $("#app"),
		events: {
			"keypress #add": "add"
		},
		initialize: function() {
			_.bindAll(this, "render", "addRow");
			this.collection.bind("reset", this.render);
			this.collection.bind("add", this.addRow);
		},
		render: function() {
			this.collection.each(this.addRow);
			return this;
		},
		addRow: function(todo) {
			var rowView = new RowView({
				model: todo
			});
			this.$("#todos").append(rowView.el);
			rowView.render();
		},
		add: function(e) {
			if (e.keyCode == 13) {
				var add = this.$("#add");
				this.collection.create({
					title: add.val()
				});
				add.val("");
			}
		}
	});
	
	var RowView = Backbone.View.extend({
		tagName: "li",
		events: {
			"click .done": "done",
			"dblclick .title": "edit",
			"keypress .edit": "update",
			"click .destroy": "destroy"
		},
		template: _.template($("#row-template").html()),
		initialize: function() {
			_.bindAll(this, "render", "remove");
			this.model.bind("change", this.render);
			this.model.bind("destroy", this.remove);
		},
		render: function() {
			var html = this.template(this.model.toJSON());
			this.$el.html(html);
			this.$(".edit").hide();
		},
		done: function() {
			this.model.save({
				done: this.$(".done").is(":checked")
			});
		},
		edit: function() {
			this.$(".view").hide();
			this.$(".edit").show();
		},
		update: function(e) {
			if (e.keyCode == 13) {
				this.model.save({
					title: this.$(".edit").val()
				})
			}
		},
		destroy: function() {
			this.model.destroy();
		}
	});
	
	var todos = new Todos();
	var appView = new AppView({
		collection: todos
	});
	todos.fetch();

});
