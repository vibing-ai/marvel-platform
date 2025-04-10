
import MainAppLayout from '@/layouts/MainAppLayout';
import Rubric from '@/templates/Rubric';

const RubricChat = () => {
  // Remove the session ID from local storage when the page is load.
  localStorage.removeItem('sessionId');
  return <Rubric />;
};

RubricChat.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default RubricChat;
