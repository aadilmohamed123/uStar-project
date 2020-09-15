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

    const output = { ["james@outlook.com"]: [{ Bob: 1 }] };
    expect(makeRefObj(children)).toEqual(output);
  });
  it("returns multiple key value pairs", () => {
    const children = [
      {
        child_id: 1,
        child_name: "Bob",
        parent_email: "james@outlook.com",
        star_count: 5,
      },
      {
        child_id: 2,
        child_name: "Jim",
        parent_email: "Danny@outlook.com",
        star_count: 8,
      },
    ];
    const output = {
      ["james@outlook.com"]: [{ Bob: 1 }],
      ["Danny@outlook.com"]: [{ Jim: 2 }],
    };

    expect(makeRefObj(children)).toEqual(output);
  });
  it("returns multiple key value pairs with same parents", () => {
    const children = [
      {
        child_id: 1,
        child_name: "Bob",
        parent_email: "james@outlook.com",
        star_count: 5,
      },
      {
        child_id: 2,
        child_name: "Jim",
        parent_email: "james@outlook.com",
        star_count: 8,
      },
    ];
    const output = {
      ["james@outlook.com"]: [{ Bob: 1 }, { Jim: 2 }],
    };

    expect(makeRefObj(children)).toEqual(output);
  });
});
describe("formatData", () => {
  it("formats data for single child", () => {
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
    const output = [
      {
        task_description: "do homework",
        stars_worth: 6,
        task_status: "pending",
        child_id: 1,
      },
    ];
    expect(formatData(data, makeRefObj(children))).toEqual(output);
  });
  it("formats data for multiple children", () => {
    const children = [
      {
        child_id: 1,
        child_name: "George",
        parent_email: "james@outlook.com",
      },
      {
        child_id: 2,
        child_name: "Jessica",
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
      {
        task_description: "wash car",
        stars_worth: 10,
        task_status: "completed",
        child_name: "Jessica",
        parent_email: "james@outlook.com",
      },
    ];
    const output = [
      {
        task_description: "do homework",
        stars_worth: 6,
        task_status: "pending",
        child_id: 1,
      },
      {
        task_description: "wash car",
        stars_worth: 10,
        task_status: "completed",
        child_id: 2,
      },
    ];
    expect(formatData(data, makeRefObj(children))).toEqual(output);
  });
  it("run test data", () => {});
});
