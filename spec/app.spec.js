process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const connection = require("../db/connection");

describe("/api", () => {
  beforeEach(() => connection.seed.run());
  // beforeEach(() =>  jest.setTimeout(() => {}, 20000));

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
    it("201 POST parent ", () => {
      return request(app)
        .post("/api/parents/")
        .send({ parent_email: "g@outlook.com", parent_name: "g" })
        .expect(201)
        .then((res) => {
          const { parent } = res.body;
          expect(parent.parent_email).toBe("g@outlook.com");
          expect(parent.parent_name).toBe("g");
        });
    });
    describe("/email", () => {
      it("200 GET parent by email", () => {
        return request(app)
          .get("/api/parents/a@outlook.com")
          .expect(200)
          .then((res) => {
            const { parent } = res.body;
            expect(parent.parent_email).toBe("a@outlook.com");
            expect(parent.parent_name).toBe("a");
          });
      });

      it("DELETE 204 parent by email", () => {
        // only when children of parent are removed
        return request(app)
          .delete("/api/parents/f@outlook.com")
          .expect(204)
          .then(() => {
            return request(app)
              .get("/api/parents")
              .expect(200)
              .then((res) => {
                res.body.parents.forEach((parent) => {
                  expect(parent.parent_email).not.toBe("f@outlook.com");
                });
              });
          });
      });
      it("PATCH 200 - update parent name", () => {
        return request(app)
          .patch("/api/parents/a@outlook.com")
          .send({ parent_name: "z" })
          .expect(200)
          .then((res) => {
            const { updatedParent } = res.body;

            expect(updatedParent.parent_name).toBe("z");
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
        it("POST 201 child to parent account", () => {
          return request(app)
            .post("/api/parents/a@outlook.com/children")
            .send({ child_name: "Selena" })
            .expect(201)
            .then((res) => {
              const { child } = res.body;

              expect(child.child_name).toBe("Selena");
              expect(child.star_count).toBe(0);
              expect(child.parent_email).toBe("a@outlook.com");
              expect(child.login_code).toBeGreaterThan(1000);
            });
        });
        it("DELETE 204 child from parent account", () => {
          return request(app).delete("/api/children/2").expect(204);
        });
      });
    });
  });

  describe("/children", () => {
    describe("/:login_code", () => {
      it.only("200 GET child by login_code ", () => {
        return request(app)
          .get("/api/children/5")
          .expect(200)
          .then((res) => {
            const { child } = res.body;
            const { login_code } = child;
            return login_code;
          })
          .then((login_code) => {
            return request(app)
              .get("/api/children/")
              .send({ login_code })
              .expect(200)
              .then((res) => {
                const { child } = res.body;
                expect(child.child_id).toBe(5);
              });
          });
      });
    });
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
      it("PATCH 200 - update child star_count", () => {
        return request(app)
          .patch("/api/children/1")
          .send({ star_inc: 1 })
          .expect(200)
          .then((res) => {
            const { updatedChild } = res.body;

            expect(updatedChild.star_count).toBe(3);
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
        it("201 POST reward by child_id", () => {
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
    describe("/:task_id", () => {
      it("204 DELETE task by task_id", () => {
        return request(app).delete("/api/tasks/4").expect(204);
      });
      it("PATCH 200 - update task status", () => {
        return request(app)
          .patch("/api/tasks/1")
          .send({ task_status: "completed" })
          .expect(200)
          .then((res) => {
            const { updatedTask } = res.body;

            expect(updatedTask.task_status).toBe("completed");
          });
      });
    });
  });
  describe("/rewards", () => {
    it("204 DELETE reward by reward_id", () => {
      return request(app).delete("/api/rewards/4").expect(204);
    });
  });
});
