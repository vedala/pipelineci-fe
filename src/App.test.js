import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

test('renders landing page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to PipelineCI/i);
  expect(linkElement).toBeInTheDocument();
});
