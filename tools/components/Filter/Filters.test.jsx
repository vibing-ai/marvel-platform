/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { describe, expect, jest, test } from '@jest/globals';

import { fireEvent, render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Filters from './Filters'; // Adjust the path if necessary

describe('Filters Component', () => {
  const tabs = [
    'All',
    'New',
    'Planning',
    'Assessments',
    'Assignments',
    'Writing',
    'Study',
  ];
  const setActiveTab = jest.fn();

  test('renders all tabs', () => {
    render(<Filters tabs={tabs} activeTab="All" setActiveTab={setActiveTab} />);

    tabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  test('applies active class to the active tab', () => {
    render(<Filters tabs={tabs} activeTab="New" setActiveTab={setActiveTab} />);

    const activeTab = screen.getByText('New');
    expect(activeTab).toHaveStyle('background-color: #9d74ff');
  });

  test('does not apply active style to inactive tabs', () => {
    render(<Filters tabs={tabs} activeTab="New" setActiveTab={setActiveTab} />);

    const inactiveTab = screen.getByText('All');
    expect(inactiveTab).not.toHaveStyle('background-color: #9d74ff');
  });

  test('calls setActiveTab when a tab is clicked', () => {
    render(<Filters tabs={tabs} activeTab="All" setActiveTab={setActiveTab} />);

    const newTab = screen.getByText('New');
    fireEvent.click(newTab);

    expect(setActiveTab).toHaveBeenCalledWith('New');
  });
});
