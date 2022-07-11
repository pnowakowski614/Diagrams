import React from 'react';
import { render, screen } from '@testing-library/react';
import Diagram from '../app/views/diagram/Diagram';

test('renders learn react link', () => {
  render(<Diagram />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
