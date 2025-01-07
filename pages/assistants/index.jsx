import MainAppLayout from '@/layouts/MainAppLayout';

import Assistants from '@/templates/Assistants';

const MarvelAssistants = () => {
  return <Assistants />;
};

MarvelAssistants.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default MarvelAssistants;
