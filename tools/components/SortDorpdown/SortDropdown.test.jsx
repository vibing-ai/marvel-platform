/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { describe, expect, jest, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import SortDropdown from './SortDropdown';

describe('SortDropdown Component', () => {
  const mockSetSortOption = jest.fn();

  test('renders the dropdown with default label', () => {
    render(
      <SortDropdown
        sortOption="Most Popular"
        setSortOption={mockSetSortOption}
      />
    );
    expect(screen.getByLabelText('Sort By')).toBeInTheDocument();
  });

  test('calls setSortOption when selecting an option', () => {
    render(
      <SortDropdown
        sortOption="Most Popular"
        setSortOption={mockSetSortOption}
      />
    );
    fireEvent.mouseDown(screen.getByRole('button'));
    fireEvent.click(screen.getByText('A-Z'));
    expect(mockSetSortOption).toHaveBeenCalledWith('A-Z');
  });
});
