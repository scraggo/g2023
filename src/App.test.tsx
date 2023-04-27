import React from 'react';
import { render } from './test-utils';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { App } from './App';

import * as npmRequests from './requests';

jest.mock('./requests.ts', () => {
  return {
    npmSearch: jest.fn(),
  };
});

const mockPackages = [
  // with all properties
  {
    package: {
      name: 'react-window',
      version: '1.8.7',
      description:
        'React components for efficiently rendering large, scrollable lists and tabular data',
      keywords: ['keyword1', 'keyword2'],
      date: '2022-04-23T14:22:43.250Z',
      links: {
        npm: 'https://www.npmjs.com/package/react-window',
      },
      author: {
        name: 'Brian Vaughn',
      },
      publisher: {
        username: 'brianvaughn',
      },
    },
  },
  // without optional properties
  {
    package: {
      name: 'react-window-infinite-loader',
      version: '1.0.8',
      description:
        'InfiniteLoader component inspired by react-virtualized but for use with react-window',
      date: '2022-06-08T18:23:24.830Z',
      links: {
        npm: 'https://www.npmjs.com/package/react-window-infinite-loader',
      },
      publisher: {
        username: 'brianvaughn',
      },
    },
  },
];

/**
 * @param text NOTE: the caching layer of useSWR will return the same results
 * if the same input text is used between tests...
 */
const fillOutFormAndSubmit = async (text: string) => {
  const input = await screen.findByTestId('search-input');
  const button = await screen.findByRole('button', {
    name: 'Search',
  });

  await act(async () => {
    await userEvent.type(input, text);
    await userEvent.click(button);
  });
};

describe('App', () => {
  let mockNPMSearch = npmRequests.npmSearch as jest.Mock;

  beforeEach(() => {
    mockNPMSearch.mockReset();
  });

  it('renders both packages', async () => {
    mockNPMSearch.mockResolvedValue(mockPackages);
    render(<App />);

    await fillOutFormAndSubmit('r');

    expect(await screen.findByText('2 packages found')).toBeDefined();
    expect(
      await screen.findByRole('link', {
        name: mockPackages[0].package.name,
      })
    ).toBeDefined();
    expect(
      await screen.findByRole('link', {
        name: mockPackages[1].package.name,
      })
    ).toBeDefined();
  });

  it('renders 1 package', async () => {
    mockNPMSearch.mockResolvedValue([mockPackages[0]]);
    render(<App />);

    await fillOutFormAndSubmit('e');

    expect(await screen.findByText('1 packages found')).toBeDefined();
    expect(
      await screen.findByRole('link', {
        name: mockPackages[0].package.name,
      })
    ).toBeDefined();
    expect(
      screen.queryByRole('link', {
        name: mockPackages[1].package.name,
      })
    ).toBeNull();
  });

  it('renders package with all properties', async () => {
    mockNPMSearch.mockResolvedValue(mockPackages);
    render(<App />);

    await fillOutFormAndSubmit('a');

    expect(await screen.findByText('2 packages found')).toBeDefined();

    const {
      package: { name, description, version, keywords, author },
    } = mockPackages[0];

    expect(
      await screen.findByRole('link', {
        name,
      })
    ).toBeDefined();
    expect(await screen.findByText(description)).toBeDefined();
    expect(await screen.findByText(keywords![0])).toBeDefined();
    expect(await screen.findByText(keywords![1])).toBeDefined();
    expect(await screen.findByText(new RegExp(version))).toBeDefined();
    expect(
      await screen.findByRole('link', {
        name: author!.name,
      })
    ).toBeDefined();
  });
});
