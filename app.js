
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var Todo = mongoose.model("Todo", new mongoose.Schema({
	title: String,
	done: Boolean
}));

var express = require("express");
var app = express.createServer();
app.set("view engine", "jade");
app.set("view options", {
	layout: false
});
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.static(__dirname + "/content"));
});

app.get("/", function(req, res) {
	return res.render("index");
});

app.get("/todos", function(req, res) {
	Todo.find(function(err, todos) {
		return res.send(todos);
	});
});

app.post("/todos", function(req, res) {
	var todo = new Todo({
		title: req.body.title,
		done: req.body.done
	});
	todo.save(function(err) {
		return res.send(todo);
	});
});

app.put("/todos/:id", function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		todo.title = req.body.title;
		todo.done = req.body.done;
		todo.save(function(err) {
			return res.send(todo);
		});
	});
});

app.del("/todos/:id", function(req, res) {
	Todo.findById(req.params.id, function(err, todo) {
		todo.remove(function() {
			return res.send();
		});
	});
});

app.listen(3000);
