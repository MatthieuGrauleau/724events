import { getMonth } from ".";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      // Test date implementation
      const date = "2022-01-01";
      const month = "janvier";
      const result = getMonth(new Date(date));
      expect(result).toEqual(month);
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      // Test date implementation
      const date = "2022-07-08";
      const month = "juillet";
      const result = getMonth(new Date(date));
      expect(result).toEqual(month);
    });
  });
});
