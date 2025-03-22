import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecomendedForYou from './RecomendedForYou';
import { ToolsListingContainer } from '@/tools';

jest.mock('@/tools', () => ({
  ToolsListingContainer: jest.fn(() => <div data-testid="tools-listing-container" />),
}));

beforeEach(() => {
jest.clearAllMocks(); // Ensure a clean mock state
});

describe('RecomendedForYou Component', () => {
  const mockData = [
    { id: '1', name: 'Tool 1', description: 'Description 1' },
    { id: '2', name: 'Tool 2', description: 'Description 2' },
    { id: '3', name: 'Tool 3', description: 'Description 3' },
    { id: '4', name: 'Tool 4', description: 'Description 4' },
    { id: '5', name: 'Tool 5', description: 'Description 5' },
  ];

  const mockFavorites = ['1', '3'];
  const mockHandleToggleFavorite = jest.fn();

  test('renders successfully', () => {
    render(
      <RecomendedForYou
        data={mockData}
        toolsFrequency={{}}
        loading={false}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    // Verify that the component renders without crashing
    expect(screen.getByTestId('tools-listing-container')).toBeInTheDocument();
  });

  test('displays all tools when toolsFrequency has fewer than 4 tools', () => {
    const toolsFrequency = {
      '1': 10,
      '2': 5,
    };

    render(
      <RecomendedForYou
        data={mockData}
        toolsFrequency={toolsFrequency}
        loading={false}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
      Object.keys(toolsFrequency).includes(tool.id)
    );

    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedTools }),
      expect.anything()
    );
  });

  test('displays exactly 4 tools when toolsFrequency has exactly 4 tools', () => {
    const toolsFrequency = {
      '1': 10,
      '2': 8,
      '3': 5,
      '4': 12,
    };

    render(
      <RecomendedForYou
        data={mockData}
        toolsFrequency={toolsFrequency}
        loading={false}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
      ['4', '1', '2', '3'].includes(tool.id)
    );

    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedTools }),
      expect.anything()
    );
  });

  test('displays the top 4 tools when toolsFrequency has more than 4 tools', () => {
    const toolsFrequency = {
      '1': 10,
      '2': 5,
      '3': 20,
      '4': 15,
      '5': 3,
    };

    render(
      <RecomendedForYou
        data={mockData}
        toolsFrequency={toolsFrequency}
        loading={false}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
      ['3', '4', '1', '2'].includes(tool.id)
    );

    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({ data: expectedTools }),
      expect.anything()
    );
  });

  test('displays 4 tools when frequencies of tools are equal', () => {
    const toolsFrequency = {
      '1': 10,
      '2': 10,
      '3': 10,
      '4': 10,
      '5': 10,
    };

    render(
      <RecomendedForYou
        data={mockData}
        toolsFrequency={toolsFrequency}
        loading={false}
        favorites={mockFavorites}
        handleToggleFavorite={mockHandleToggleFavorite}
      />
    );

    const expectedTools = mockData.filter((tool) =>
      ['1', '2', '3', '4'].includes(tool.id) // Any combination of 4 tools is valid
    );

    // Ensure exactly 4 tools are included
    expect(ToolsListingContainer).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining(expectedTools),
      }),
      expect.anything()
    );
    expect(ToolsListingContainer.mock.calls[0][0].data).toHaveLength(4);
  });

//   test('displays the top 4 tools when we have two tools that are both 4th frequeniest', () => {
//     const toolsFrequency = {
//       '1': 10,
//       '2': 5,
//       '3': 20,
//       '4': 15,
//       '5': 5,
//     };

//     render(
//       <RecomendedForYou
//         data={mockData}
//         toolsFrequency={toolsFrequency}
//         loading={false}
//         favorites={mockFavorites}
//         handleToggleFavorite={mockHandleToggleFavorite}
//       />
//     );

//     const expectedTools = mockData.filter((tool) =>
//       ['3', '4', '1', '2'].includes(tool.id)
//     );

//     expect(ToolsListingContainer).toHaveBeenCalledWith(
//       expect.objectContaining({ data: expectedTools }),
//       expect.anything()
//     );
//   });
});