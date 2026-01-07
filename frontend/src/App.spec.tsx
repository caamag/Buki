import { render } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders Router component", () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});
