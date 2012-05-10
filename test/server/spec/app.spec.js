
describe("Server", function() {

	var request = require("request");
	var url = "http://localhost:3000/todos";
	var _id;
	
	describe("GET", function() {
		it("Should be defined", function(done) {
			request({
				url: url,
				method: "GET"
			}, function(error, response, body) {
				expect(body).toBeDefined();
				done();
			});
		});
	});
	
	describe("POST", function() {
		it("Should add a todo", function(done) {
			request({
				url: url,
				method: "POST",
				json: {
					title: "BrainPirlo",
					done: false
				}
			}, function(error, response, body) {
				_id = body._id;
				expect(body.title).toEqual("BrainPirlo");
				done();
			});
		});
	});
	
	describe("PUT", function() {
		it("Should update a todo", function(done) {
			request({
				url: url + "/" + _id,
				method: "PUT",
				json: {
					title: "WEBdeBS",
					done: true
				}
			}, function(error, response, body) {
				expect(body.title).toEqual("WEBdeBS");
				done();
			});
		});
	});
	
	describe("DELETE", function()  {
		it("Should delete a todo", function(done) {
			request({
				url: url + "/" + _id,
				method: "DELETE"
			}, function(error, response, body) {
				expect(body).toBeUndefined();
				done();
			});
		});
	});
	
});
