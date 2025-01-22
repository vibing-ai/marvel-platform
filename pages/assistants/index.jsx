import AssistantsPage from '@/templates/AssistantsPage';
import MainAppLayout from '@/layouts/MainAppLayout';

const AssistantsDiscovery = () => {
  return <AssistantsPage />;
};

AssistantsDiscovery.getLayout = (page) => {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default AssistantsDiscovery;
