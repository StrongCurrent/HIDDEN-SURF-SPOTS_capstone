import Header from ".";
import { render, screen } from "@testing-library/react";

test("test a header", () => {
  render(<Header>YOUR HIDDEN SPOTS</Header>);
  const header = screen.getByText("YOUR HIDDEN SPOTS");
  expect(header).toBeInTheDocument();
});
