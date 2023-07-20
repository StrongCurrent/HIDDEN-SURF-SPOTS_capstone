import Heading from ".";
import { render, screen } from "@testing-library/react";

test("test", () => {
  render(<Heading>YOUR HIDDEN SPOTS</Heading>);
  const element = screen.getByText("YOUR HIDDEN SPOTS");
  expect(element).toBeInTheDocument();
});
