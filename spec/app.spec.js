process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  afterAll(() => connection.destroy());
  describe("/parents", () => {
    it("200 GET list of parents (admin)", () => {
      return request(app)
        .get("/api/parents")
        .expect(200)
        .then((res) => {
          res.body.parents.forEach((parent) => {
            expect(Object.keys(parent)).toEqual([
              "parent_email",
              "parent_name",
              "created_at",
            ]);
          });
        });
    });
    describe("/children", () => {
      it("200 GET list of children by parent", () => {
        return request(app)
          .get("/api/parents/c@outlook.com/children")
          .expect(200)
          .then((res) => {
            res.body.children.forEach((child) => {
     
              expect(child.parent_email).toBe("c@outlook.com");
              expect(Object.keys(child)).toEqual([
                "child_id",
                "login_code",
                "child_name",
                "parent_email",
                "star_count",
              ]);
            });
          });
      });
    });
  });

  describe("/children", () => {});
});
