var expect = require("chai").expect;
var User = require("../business/model/user.js")

describe("User Model Test", function() {
	describe("User Constructor Test", function() {
		it("Create New Users", function(){
			var user1 = new User("DiogoDantas", "admin");
			var user2 = new User("HigorAnjos", "aDmin");
			var user3 = new User("MarcosAlves", "Admin")

			/* User1 creation check*/
			expect(user1.login).to.equal("DiogoDantas");
			expect(user1.password).to.equal("admin");

			/* User2 creation check*/
			expect(user2.login).to.equal("HigorAnjos");
			expect(user2.password).to.equal("aDmin");

			/* User3 creation check*/
			expect(user3.login).to.equal("MarcosAlves");
			expect(user3.password).to.equal("Admin");
		});
	});
});