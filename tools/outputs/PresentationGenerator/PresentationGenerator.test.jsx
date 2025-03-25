import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import PresentationGenerator from './PresentationGenerator.jsx';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('file-saver', () => ({
  saveAs: jest.fn(),
}));

describe('PresentationGenerator Component', () => {
  const mockResponse = {
    list_slides: [
      { title: 'Title 1', content: 'Content 1', suggestions: 'Suggestion 1' },
      { title: 'Title 2', content: 'Content 2' },
    ],
  };

  beforeEach(() => {
    useSelector.mockImplementation((callback) =>
      callback({ tools: { response: mockResponse } })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PresentationGenerator />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Title 1')).toBeInTheDocument();
  });

  it('renders slides correctly', () => {
    render(<PresentationGenerator />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('calls handleExport and saves file correctly', () => {
    render(<PresentationGenerator />);
    const exportButton = screen.getByText('Export Slides as Text');
    fireEvent.click(exportButton);

    expect(FileSaver.saveAs).toHaveBeenCalledTimes(1);
    expect(FileSaver.saveAs).toHaveBeenCalledWith(
      expect.any(Blob),
      'presentation.txt'
    );
  });

  it('does not render export button when list_slides is undefined', () => {
    useSelector.mockImplementation((callback) =>
      callback({ tools: { response: {} } })
    );
    render(<PresentationGenerator />);
    expect(
      screen.queryByText('Export Slides as Text')
    ).not.toBeInTheDocument();
  });
});
