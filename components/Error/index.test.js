import Error from "../Error";
import { render, screen } from "@testing-library/react";

test("Error Component", () => {
  render(<Error>Error Message</Error>);

  const errorText = screen.getByText("Error Message");
  expect(errorText).toBeInTheDocument();
});