import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import AssistantCard from './index';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

const mockStore = configureStore([]);

describe('AssistantCard', () => {
  const mockAssistant = {
    id: 'co_teacher',
    name: 'CoTeacher',
    description: 'AI assistant for personalized teaching support',
    group: 'classroom_support'
  };

  const mockRouter = {
    push: jest.fn()
  };

  const initialState = {
    assistant: {
      loading: false,
      error: null
    }
  };

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = (component) => {
    const store = mockStore(initialState);
    return render(
      <Provider store={store}>
        {component}
      </Provider>
    );
  };

  it('renders assistant information correctly', () => {
    renderWithProvider(<AssistantCard assistant={mockAssistant} />);

    expect(screen.getByText(mockAssistant.name)).toBeInTheDocument();
    expect(screen.getByText(mockAssistant.description)).toBeInTheDocument();
    expect(screen.getByText(`Group: ${mockAssistant.group}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /launch chat/i })).toBeInTheDocument();
  });

  it('navigates to chat page when launch button is clicked', () => {
    renderWithProvider(<AssistantCard assistant={mockAssistant} />);

    const launchButton = screen.getByRole('button', { name: /launch chat/i });
    fireEvent.click(launchButton);

    expect(mockRouter.push).toHaveBeenCalledWith(`/chat/${mockAssistant.id}`);
  });

  it('disables launch button while loading', () => {
    const loadingState = {
      assistant: {
        loading: true,
        error: null
      }
    };
    const store = mockStore(loadingState);
    
    render(
      <Provider store={store}>
        <AssistantCard assistant={mockAssistant} />
      </Provider>
    );

    const launchButton = screen.getByRole('button', { name: /launch chat/i });
    expect(launchButton).toBeDisabled();
  });
});
