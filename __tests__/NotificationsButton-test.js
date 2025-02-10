import { fireEvent, render } from '@testing-library/react';

import NotificationsButton from '../components/NotificationsButton/NotificationsButton';

jest.mock('@/libs/redux/store', () => {
  const originalModule = jest.requireActual('@/libs/redux/store');

  return {
    __esModule: true,
    ...originalModule,
    auth: { currentUser: { uid: 'a' } },
  };
});

it('NotificationsButton should have notifications list not visible by default', async () => {
  const { findByText } = render(<NotificationsButton />);

  const notifs = await findByText('Notifications');
  const style = getComputedStyle(notifs);
  expect(style._values.visibility).toBe('hidden');
}, 10000);

it(
  'NotificationButton should toggle the visibilty of' +
    ' the notifications list after each click',
  async () => {
    const { findByRole, findByText } = render(<NotificationsButton />);

    const button1 = await findByRole('button', { name: /^toggle$/i });

    fireEvent.click(button1);

    const notifs1 = await findByText('Notifications');

    let style = getComputedStyle(notifs1);
    expect(style._values.visibility).toBe('visible');

    const button2 = await findByRole('button', { name: /^toggle$/i });

    fireEvent.click(button2);

    const notifs2 = await findByText('Notifications');

    style = getComputedStyle(notifs2);
    expect(style._values.visibility).toBe('hidden');
  },
  10000
);
