import { TOOLS_ID } from '@/tools/libs/constants/tools';

/**
 * Renders tool data based on the toolId and item provided from tool constants.
 *
 * @param {string} toolId - The ID of the tool to render data for.
 * @param {object} item - The item containing tool data and outputs.
 * @return {object} An object containing the rendered tool data.
 */
const getToolData = (props) => {
  const { toolId, item } = props;

  switch (toolId) {
    case TOOLS_ID.MULTIPLE_CHOICE_QUIZ_GENERATOR: {
      const title = `Multiple Choice Assessment - ${item.topic}`;
      const description =
        item.description ||
        `Multiple Choice Questions taken from ${item.topic}`;
      const output = item.response;
      const backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      const logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';

      return {
        title,
        description,
        backgroundImgURL,
        logo,
        output,
        ...item,
      };
    }
    case TOOLS_ID.FLASHCARDS_GENERATOR: {
      const concepts = item.response?.map((card) => card.concept) || [];
      const primaryConcept = concepts[0] || 'Various Concepts';

      let notableConcepts = '';
      if (concepts.length > 1) {
        notableConcepts =
          concepts.slice(0, 1).join(', ') +
          (concepts.length > 2 ? ', and ' : ' and ') +
          concepts[concepts.length - 1];
      } else {
        notableConcepts = primaryConcept;
      }

      const title = `Flashcards on ${primaryConcept} and More`;
      const description = `Includes concepts like ${notableConcepts}`;
      const flashCards = item.response;
      const flashcardBackgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      const flashcardLogo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';

      return {
        title,
        description,
        backgroundImgURL: flashcardBackgroundImgURL,
        logo: flashcardLogo,
        output: flashCards,
        ...item,
      };
    }
    case TOOLS_ID.SYLLABUS_GENERATOR: {
      const title = `Syllabus - ${item.response.course_information.course_title}`;
      const description =
        item.response.course_information.description ||
        `Syllabus generated from ${item.response.course_information.course_title}`;
      const output = item.response;
      const backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      const logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/SyllabusLogo.png?alt=media&token=5ea7b96a-d0c9-444a-823f-4fd5721e7e14';

      return {
        title,
        description,
        backgroundImgURL,
        logo,
        output,
        ...item,
      };
    }
    default:
      return {
        title: 'Default Title',
        backgroundImgURL: null,
        logo: null,
        output: null,
        ...item,
      };
  }
};

export { getToolData };
