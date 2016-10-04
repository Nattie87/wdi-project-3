require("../spec_helper");

const User  = require("../../models/user");
const Deed  = require("../../models/deed");

let TOKEN;

describe("authenticiation test", function(){
  describe("POST /login", function(){
    it ("Should get a 200 response", function(done){
      this.skip();
    });
  });
});
describe("Deed tests", () => {
  beforeEach(done => {
    Deed.collection.drop();
    done();
  });
}

  describe("GET /api/deeds", () =>
    beforeEach(done => {
      const deed = new deed({
        deed: "Plant my window boxes",
        image: "http://fillmurray.com/200/300 (11KB)",
        location: "London"
      });
      deed.save((err, deed) => {
        done();
      });

      it ("should return a 200 response", done => {
        api.get('/api/deeds')
        .set("Accept", "application/json")
        .expect(200, done);
      });
      it("should respond with a JSON object", done => {
        api.get("/api/deeds");
      });

      it("should return an object with the following keys", done => {
        api.get ("api/deeds")
        .set('Accept', "application/json")
        .end((err, res) => {
          expect(res.body)
          .to.have.property("deeds"
          .and.be.an("array")
          .and.have.property(0)
          .and.have.all.keys([
            "_id",
            "deed",
            "image",
            "location",
            "userid",
            "createdAt",
            "updatedAt"
          ]));
          done();
        });
      });
    }));
