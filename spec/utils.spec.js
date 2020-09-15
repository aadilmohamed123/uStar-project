const { randNumFunc, makeRefObj, formatData } = require("../utils/utils");

describe("randNumFunc", () => {
  it("return number", () => {
    expect(typeof randNumFunc()).toBe("number");
  });
  it("return four digits", () => {
    expect(randNumFunc()).toBeLessThan(10000);
    expect(randNumFunc()).toBeGreaterThan(999);
  });
});

describe("makeRefObj", () => {
  it("returns one key value pair", () => {
    const children = [
      {
        child_id: 1,
        child_name: "Bob",
        parent_email: "james@outlook.com",
      },
    ];
    const output = { 1: { ["james@outlook.com"]: "Bob" } };
    expect(makeRefObj(children)).toEqual(output);
  });
});
describe.only("formatData", () => {
  it("formats data", () => {
    const children = [
      {
        child_id: 1,
        child_name: "George",
        parent_email: "james@outlook.com",
      },
    ];
    const data = [
      {
        task_description: "do homework",
        stars_worth: 6,
        task_status: "pending",
        child_name: "George",
        parent_email: "james@outlook.com",
      },
    ];
    expect(formatData(data, makeRefObj(children)));
  });
});
