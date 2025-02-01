import FlashCardList from './FlashCardList';
import QuizResponse from './QuizResponse';
import SyllabusGeneratorResponse from './SyllabusGeneratorResponse';
import WorksheetGeneratorResponse from './WorksheetGeneratorResponse';
import PresentationGeneratorResponse from './PresentationGeneratorResponse';

import { TOOLS_ID } from '@/tools/libs/constants/tools';

const TOOL_OUTPUTS = {
  [TOOLS_ID.FLASHCARDS_GENERATOR]: FlashCardList,
  [TOOLS_ID.MULTIPLE_CHOICE_QUIZ_GENERATOR]: QuizResponse,
  [TOOLS_ID.WORKSHEET_GENERATOR]: WorksheetGeneratorResponse,
  [TOOLS_ID.SYLLABUS_GENERATOR]: SyllabusGeneratorResponse,
  [TOOLS_ID.PRESENTATION_GENERATOR]: PresentationGeneratorResponse,
};

export default TOOL_OUTPUTS;
