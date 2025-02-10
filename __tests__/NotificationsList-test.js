import { act, fireEvent, render } from '@testing-library/react';

import NotificationsList from '../components/NotificationList/NotificationList';

import { setReadStatus } from '@/libs/services/notifications/setReadStatus';

jest.mock('@/libs/redux/store', () => {
  const originalModule = jest.requireActual('@/libs/redux/store');

  return {
    __esModule: true,
    ...originalModule,
    auth: { currentUser: { uid: 'a' } },
  };
});

jest.mock('@/libs/services/notifications/setReadStatus', () => {
  return {
    setReadStatus: jest.fn((_a, _b, _c) => {}),
  };
});

const dataone = [
  {
    actionLink: 'No_Action',
    date: {
      seconds: 2,
      nanoseconds: 0,
    },
    description: 'Placeholder Text',
    id: '1',
    isRead: true,
    nid: '1',
    title: 'Welcome',
    type: 'Announcement',
    user: 'a',
  },
  {
    actionLink: 'No_Action',
    date: {
      seconds: 1,
      nanoseconds: 0,
    },
    description: 'Placeholder Text 2',
    id: '2',
    isRead: false,
    nid: '2',
    title: 'Welcome 2',
    type: 'Announcement 2',
    user: 'a',
  },
];

const datatwo = [
  {
    actionLink: 'No_Action',
    date: {
      seconds: 2,
      nanoseconds: 0,
    },
    description: 'Placeholder Text',
    id: '1',
    isRead: false,
    nid: '1',
    title: 'Welcome',
    type: 'Announcement',
    user: 'a',
  },
  {
    actionLink: 'No_Action',
    date: {
      seconds: 1,
      nanoseconds: 0,
    },
    description: 'Placeholder Text 2',
    id: '2',
    isRead: false,
    nid: '2',
    title: 'Welcome 2',
    type: 'Announcement 2',
    user: 'a',
  },
];

const datathree = [
  {
    actionLink: 'No_Action',
    date: {
      seconds: 2,
      nanoseconds: 0,
    },
    description: 'Placeholder Text',
    id: '1',
    isRead: true,
    nid: '1',
    title: 'Welcome',
    type: 'Announcement',
    user: 'a',
  },
  {
    actionLink: 'No_Action',
    date: {
      seconds: 1,
      nanoseconds: 0,
    },
    description: 'Placeholder Text 2',
    id: '2',
    isRead: true,
    nid: '2',
    title: 'Welcome 2',
    type: 'Announcement 2',
    user: 'a',
  },
];

jest.mock('reactfire', () => {
  return {
    useFirestoreCollectionData: jest
      .fn()
      .mockReturnValueOnce({ status: 'done', data: datatwo })
      .mockReturnValueOnce({ status: 'done', data: datatwo })
      .mockReturnValueOnce({ status: 'done', data: dataone })
      .mockReturnValueOnce({ status: 'done', data: dataone })
      .mockReturnValue({ status: 'done', data: datathree }),
  };
});

it('Ensures all notifications start as unread', async () => {
  const { findAllByText } = render(<NotificationsList />);

  const buttons = await findAllByText('Mark As Read');
  expect(buttons.length).toBe(2);
});

it('Pressing \'Mark as Read\' on a notification turns the text into \'Mark as Unread\'', async () => {
  const { findAllByText, queryAllByText } = render(<NotificationsList />);

  const buttons = await findAllByText('Mark As Read');

  await act(async () => {
    fireEvent.click(buttons[0]);
  });
  const read = queryAllByText('Mark As Read');
  const unread = queryAllByText('Mark As Unread');
  expect(setReadStatus).toBeCalledWith([dataone[0]]);
  expect(read.length).toBe(1);
  expect(unread.length).toBe(1);
});

it('Pressing \'Marks all as Unread\' marks all notifications as read', async () => {
  const { findAllByText, findByText } = render(<NotificationsList />);
  const button = await findByText('Mark all as read');
  await act(async () => {
    fireEvent.click(button);
  });

  const unread = await findAllByText('Mark As Unread');
  expect(unread.length).toBe(2);
  expect(setReadStatus).toBeCalledWith(datathree);
});
