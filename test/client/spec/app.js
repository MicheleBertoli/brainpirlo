
describe("Todo", function() {
	
	it("Should have a title", function() {
		var todo = new Todo();
		expect(todo.get("title")).toBeDefined();
	});
	
});
