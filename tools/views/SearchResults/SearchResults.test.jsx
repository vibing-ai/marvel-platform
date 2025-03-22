import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchResults from './SearchResults';
import { ToolsListingContainer } from '@/tools';

jest.mock('@/tools', () => ({
  ToolsListingContainer: jest.fn(() => <div data-testid="tools-listing-container" />),
}));

describe('SearchResults Component', () => {
  const mockData = [
    { id: 1, name: 'Tool One', description: 'Description for Tool One' },
    { id: 2, name: 'Tool Two', description: 'Another description' },
    { id: 3, name: 'Special Tool', description: 'Specialized for testing' },
  ];

  const mockFavorites = [1, 3];
  const mockHandleToggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock state between tests
  });

  test('renders successfully', () => {
    render(
      <SearchResults
        data={mockData}
        loading={false}
        searchQuery=""
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    expect(screen.getByTestId('tools-listing-container')).toBeInTheDocument();

    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        data: mockData, // When searchQuery is empty, all tools are shown
        loading: false,
        favorites: mockFavorites,
        handleToggleFavorite: mockHandleToggleFavorite,
        category: 'Search Results',
      }),
      expect.anything()
    );
  });

  test('filters tools based on search query', () => {
    const searchQuery = 'Tool One';

    render(
      <SearchResults
        data={mockData}
        loading={false}
        searchQuery={searchQuery}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
        [1].includes(tool.id)
      );


    expect(ToolsListingContainer).toHaveBeenCalledWith(
    expect.objectContaining({
        data: expect.arrayContaining(expectedTools),
    }),
    expect.anything()
    );
    expect(ToolsListingContainer.mock.calls[0][0].data).toHaveLength(1);

  });

  test('handles no matches for search query', () => {
    const searchQuery = 'Nonexistent';

    render(
      <SearchResults
        data={mockData}
        loading={false}
        searchQuery={searchQuery}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
        [].includes(tool.id)
      );


    expect(ToolsListingContainer).toHaveBeenCalledWith(
    expect.objectContaining({
        data: expect.arrayContaining(expectedTools),
    }),
    expect.anything()
    );
    expect(ToolsListingContainer.mock.calls[0][0].data).toHaveLength(0);


  });




  test('handles case-insensitive search', () => {
        const searchQuery = 'tOoL oNe';

        render(
          <SearchResults
            data={mockData}
            loading={false}
            searchQuery={searchQuery}
            favorites={mockFavorites}
            handleToggleFavorite={mockHandleToggleFavorite}
          />
        );

        const expectedTools = mockData.filter((tool) =>
            [1].includes(tool.id)
          );


        expect(ToolsListingContainer).toHaveBeenCalledWith(
        expect.objectContaining({
            data: expect.arrayContaining(expectedTools),
        }),
        expect.anything()
        );
        expect(ToolsListingContainer.mock.calls[0][0].data).toHaveLength(1);
  });

  test('descrption search', () => {
    const searchQuery = 'Descript';

    render(
      <SearchResults
        data={mockData}
        loading={false}
        searchQuery={searchQuery}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
        [1,2].includes(tool.id)
      );


    expect(ToolsListingContainer).toHaveBeenCalledWith(
    expect.objectContaining({
        data: expect.arrayContaining(expectedTools),
    }),
    expect.anything()
    );
    expect(ToolsListingContainer.mock.calls[0][0].data).toHaveLength(2);
});


});