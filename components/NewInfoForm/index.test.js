import AddNewInfoForm from '../NewInfoForm';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

beforeEach(() => {
  fetch.mockClear();
});

test('AddNewInfoForm', async () => {
  render(<AddNewInfoForm spotId="1" />);

  const inputField = screen.getByLabelText(/ADD SOME SPOT INFORMATION/);
  expect(inputField).toBeInTheDocument();

  const button = screen.getByText(/add this entry/i);
  expect(button).toBeInTheDocument();

  fireEvent.change(inputField, { target: { value: 'New Entry' } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/spots/1/informations', expect.anything());
  });
});
