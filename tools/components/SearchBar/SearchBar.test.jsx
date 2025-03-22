/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar Component', () => {
  const mockOnSearch = jest.fn();

  test('renders the search bar with placeholder text', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search for a tool');
    expect(inputElement).toBeInTheDocument();
  });

  test('calls onSearch when typing', () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const inputElement = screen.getByPlaceholderText('Search for a tool');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});