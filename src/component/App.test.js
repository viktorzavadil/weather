import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const textInHeader = screen.getByText(/Actual Weather/i);
  expect(textInHeader).toBeInTheDocument();
});
