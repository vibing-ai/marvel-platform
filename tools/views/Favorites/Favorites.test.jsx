import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Favorites from './Favorites';
import { ToolsListingContainer } from '@/tools';

// Mock ToolsListingContainer
jest.mock('@/tools', () => ({
  ToolsListingContainer: jest.fn(() => <div data-testid="tools-listing-container" />),
}));

beforeEach(() => {
  jest.clearAllMocks(); // Reset mocks before each test
});

describe('Favorites Component', () => {
  const mockData = [
    { id: '1', name: 'Tool 1', description: 'Description 1' },
    { id: '2', name: 'Tool 2', description: 'Description 2' },
    { id: '3', name: 'Tool 3', description: 'Description 3' },
  ];

  const mockFavorites = ['1', '3'];
  const mockHandleToggleFavorite = jest.fn();

  test('renders successfully', () => {
    render(
      <Favorites
        data={mockData}
        favorites={mockFavorites}
        loading={false}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    // Verify that the component renders without crashing
    expect(screen.getByTestId('tools-listing-container')).toBeInTheDocument();
  });

  test('passes the correct favorite tools to ToolsListingContainer', () => {
    render(
      <Favorites
        data={mockData}
        favorites={mockFavorites}
        loading={false}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) => mockFavorites.includes(tool.id));

    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedTools }),
      expect.anything()
    );
  });

  test('handles an empty favorites list correctly', () => {
    render(
      <Favorites
        data={mockData}
        favorites={[]}
        loading={false}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    // Verify that no tools are passed to ToolsListingContainer
    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ data: [] }),
      expect.anything()
    );
  });

  test('handles the loading state correctly', () => {
    render(
      <Favorites
        data={mockData}
        favorites={mockFavorites}
        loading={true}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    // Verify that ToolsListingContainer is still rendered in a loading state
    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ loading: true }),
      expect.anything()
    );
  });
});