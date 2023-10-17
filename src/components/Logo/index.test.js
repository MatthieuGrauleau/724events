import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Logo from ".";

describe("Logo component", () => {
  describe("When a logo is created", () => {
    it("it contains this 8 path hash values", () => {
      render(<Logo />);
      expect(md5(screen.getByTestId("logo-part1").getAttribute("d"))).toEqual(
        "65c7b4bf9f8220e747acc2b1ac09de47"
      );
      expect(md5(screen.getByTestId("logo-part2").getAttribute("d"))).toEqual(
        "9fe9dc4775273bfc6625d1851edd677f"
      );
      expect(md5(screen.getByTestId("logo-part3").getAttribute("d"))).toEqual(
        "9ed19237b220b69b9b63e486967cb3b8"
      );
      expect(md5(screen.getByTestId("logo-part4").getAttribute("d"))).toEqual(
        "1406bcd58f617b245f2980342d657877"
      );
      expect(md5(screen.getByTestId("logo-part5").getAttribute("d"))).toEqual(
        "1973ff19cb9624eb14477d6cd024c055"
      );
      expect(md5(screen.getByTestId("logo-part6").getAttribute("d"))).toEqual(
        "c3a1b7e68f8dd5d9a4ab87b024273037"
      );
      expect(md5(screen.getByTestId("logo-part7").getAttribute("d"))).toEqual(
        "d8bcac648f5aea542e49d983031ee2d7"
      );
      expect(md5(screen.getByTestId("logo-part8").getAttribute("d"))).toEqual(
        "8c0d16174994647c84289f1ef521459d"
      );
    });
  });
  describe("When a logo is created and size is not set", () => {
    it("must have the small size", () => {
      render(<Logo />);
      expect(screen.getByTestId("logo-svg").getAttribute("width")).toEqual(
        "101"
      );
      expect(screen.getByTestId("logo-svg").getAttribute("height")).toEqual(
        "35"
      );
    });
  });
  describe("When a logo is created and size is set to small", () => {
    it("must have the small size", () => {
      render(<Logo size="small" />);
      expect(screen.getByTestId("logo-svg").getAttribute("width")).toEqual(
        "101"
      );
      expect(screen.getByTestId("logo-svg").getAttribute("height")).toEqual(
        "35"
      );
    });
  });
  describe("When a logo is created and size is set to large", () => {
    it("must have the large size", () => {
      render(<Logo size="large" />);
      expect(screen.getByTestId("logo-svg").getAttribute("width")).toEqual(
        "196"
      );
      expect(screen.getByTestId("logo-svg").getAttribute("height")).toEqual(
        "67"
      );
    });
  });
});
