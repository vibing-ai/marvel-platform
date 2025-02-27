import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import AssistantChat from '@/components/assistants/Chat/AssistantChat';
import { Loader } from '@/components/Loader';

const AssistantChatPage = () => {
  const router = useRouter();
  const { assistant } = router.query;
  const { activeAssistant, error } = useSelector((state) => state.assistant);

  // Redirect to assistants page if no assistant is selected
  useEffect(() => {
    if (!assistant && !activeAssistant) {
      router.replace('/assistants');
    }
  }, [assistant, activeAssistant, router]);

  if (!assistant) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => router.push('/assistants')}>
          Back to Assistants
        </button>
      </div>
    );
  }

  return <AssistantChat />;
};

export default AssistantChatPage;
