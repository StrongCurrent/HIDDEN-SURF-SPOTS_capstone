import Header from ".";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<Header>YOUR HIDDEN SPOTS</Header>);
  const element = screen.getByText("YOUR HIDDEN SPOTS");
  expect(element).toBeInTheDocument();
});
