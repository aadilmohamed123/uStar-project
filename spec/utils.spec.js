const { randNumFunc } = require("../utils/utils");

describe("randNumFunc", () => {
  it("return number", () => {
    expect(typeof randNumFunc()).toBe("number");
  });
  it("return four digits", () => {
    expect(randNumFunc()).toBeLessThan(10000);
    expect(randNumFunc()).toBeGreaterThan(999);
  });
});
