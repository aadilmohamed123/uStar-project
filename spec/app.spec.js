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

  describe("/children", () => {
    describe("/:child_id", () => {
      it("200 GET child by child id", () => {
        return request(app)
          .get("/api/children/3")
          .expect(200)
          .then((res) => {
            const { child } = res.body;
            expect(child.child_id).toBe(3);
            expect(Object.keys(child)).toEqual([
              "child_id",
              "login_code",
              "child_name",
              "parent_email",
              "star_count",
            ]);
          });
      });
      describe("/tasks", () => {
        it("200 GET tasks by child_id", () => {
          return request(app)
            .get("/api/children/3/tasks")
            .expect(200)
            .then((res) => {
              const { tasks } = res.body;
              tasks.forEach((task) => {
                expect(Object.keys(task)).toEqual([
                  "task_id",
                  "child_id",
                  "task_description",
                  "task_status",
                  "stars_worth",
                ]);
              });
            });
        });
        it("201 POST new task by child_id", () => {
          return request(app)
            .post("/api/children/3/tasks")
            .send({ task_description: "wash clothes by hand", stars_worth: 20 })
            .expect(201)
            .then((res) => {
              const { task } = res.body;
              expect(task.task_description).toBe("wash clothes by hand");
              expect(task.stars_worth).toBe(20);
              expect(task.task_status).toBe("outstanding");
              expect(task.child_id).toBe(3);
            });
        });
      });
      describe("/rewards", () => {
        it("200 GET rewards by child_id ", () => {
          return request(app)
            .get("/api/children/3/rewards")
            .expect(200)
            .then((res) => {
              const { rewards } = res.body;
              rewards.forEach((reward) => {
                expect(Object.keys(reward)).toEqual([
                  "reward_id",
                  "child_id",
                  "reward_description",
                  "star_cost",
                ]);
              });
            });
        });
        it.only("201 POST rewards by Child_id", () => {
          return request(app)
            .post("/api/children/5/rewards")
            .send({ reward_description: "Go to movies", star_cost: 10 })
            .expect(201)
            .then((res) => {
              const { reward } = res.body;
              expect(reward.child_id).toBe(5);
              expect(reward.reward_description).toBe("Go to movies");
              expect(reward.star_cost).toBe(10);
            });
        });
      });
    });
  });
  describe("/tasks", () => {
    it("204 DELETE task by task_id", () => {
      return request(app).delete("/api/tasks/4").expect(204);
    });
  });
});
