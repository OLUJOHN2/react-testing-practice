import { render, screen } from "@testing-library/react";
import HelloWorld from "../src/components/HelloWorld";

describe("Hello World Component", () => {
  it("should render a hello world component", () => {
    render(<HelloWorld />);
    expect(screen.getByText("HelloWorld")).toBeInTheDocument();
  });
});
