import { TOOLS_ID } from '../constants/tools';

const escapeMarkdown = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/([*_#`[\]>\\])/g, '\\$1');
};

const convertQuizToMarkdown = (response) => {
  if (!Array.isArray(response)) return '';

  return response
    .map((question, index) => {
      const escapedQuestion = escapeMarkdown(question.question);
      const questionText = `# ${index + 1}. ${escapedQuestion}\n`;
      const choices = question.choices
        .map(
          (choice) =>
            `&nbsp;&nbsp;${choice.key}. ${escapeMarkdown(choice.value)}`
        )
        .join('\n\n');

      return `${questionText}\n${choices}`;
    })
    .join('\n\n');
};

const convertFlashcardsToMarkdown = (response) => {
  if (!Array.isArray(response)) return '';

  return response
    .map((card) => {
      const escapedDefinition = escapeMarkdown(card.definition);
      return `### ${escapeMarkdown(card.concept)}\n${escapedDefinition}`;
    })
    .join('\n\n---\n\n');
};

const convertWorksheetToMarkdown = (response) => {
  if (typeof response !== 'object') return '';

  let markdown = '';
  let questionNumber = 1;

  // Multiple Choice Questions
  if (response.multiple_choice_question) {
    response.multiple_choice_question.forEach((q) => {
      markdown += `# Question ${questionNumber}: Multiple Choice\n\n`;
      markdown += `${escapeMarkdown(q.question)}\n\n`;
      q.choices.forEach((choice) => {
        const escapedValue = escapeMarkdown(choice.value);
        markdown += `&nbsp;&nbsp;${choice.key}. ${escapedValue}\n`;
      });
      markdown += `\n**Answer:** ${escapeMarkdown(q.answer)}\n`;
      markdown += `**Explanation:** ${escapeMarkdown(q.explanation)}\n\n`;
      questionNumber += 1;
    });
  }

  // True/False Questions
  if (response.true_false) {
    response.true_false.forEach((q) => {
      markdown += `# Question ${questionNumber}: True/False\n\n`;
      markdown += `${escapeMarkdown(q.question)}\n\n`;
      markdown += `**Answer:** ${q.answer ? 'True' : 'False'}\n`;
      markdown += `**Explanation:** ${escapeMarkdown(q.explanation)}\n\n`;
      questionNumber += 1;
    });
  }

  // Fill in the Blank Questions
  if (response.fill_in_the_blank) {
    response.fill_in_the_blank.forEach((q) => {
      markdown += `# Question ${questionNumber}: Fill in the Blank\n\n`;

      // Format question with blanks
      let questionText = escapeMarkdown(q.question);
      q.blanks.forEach((blank) => {
        questionText = questionText.replace(`{${blank.key}}`, '____');
      });
      markdown += `${questionText}\n\n`;

      // Word Bank
      markdown += '**Word Bank:**\n';
      markdown += q.word_bank
        .map((word) => `• ${escapeMarkdown(word)}`)
        .join('\n');
      markdown += '\n\n';

      // Answers
      markdown += '**Answers:**\n';
      q.blanks.forEach((blank) => {
        markdown += `${Number(blank.key) + 1}. ${escapeMarkdown(
          blank.value
        )}\n`;
      });
      markdown += `\n**Explanation:** ${escapeMarkdown(q.explanation)}\n\n`;
      questionNumber += 1;
    });
  }

  return markdown.trim();
};

const convertSyllabusToMarkdown = (response) => {
  if (typeof response !== 'object') return '';

  let markdown = '| Section | Details |\n|---------|----------|\n';

  const courseInfo = response.course_information;
  if (courseInfo) {
    markdown += `| Course Title | ${escapeMarkdown(
      courseInfo.course_title
    )} |\n`;
    markdown += `| Grade Level | ${escapeMarkdown(courseInfo.grade_level)} |\n`;
    markdown += `| Description | ${escapeMarkdown(courseInfo.description)} |\n`;
  }

  const instructorInfo = response.instructor_info;
  if (instructorInfo) {
    markdown += `| Instructor Name | ${escapeMarkdown(
      instructorInfo.name
    )} |\n`;

    markdown += `| Instructor Title | ${escapeMarkdown(
      instructorInfo.title
    )} |\n`;
  }

  const objectives = response.course_description_objectives?.objectives;
  if (objectives) {
    const allObjectives = objectives
      .map((obj) => `• ${escapeMarkdown(obj)}`)
      .join('<br>');
    markdown += `| Objectives | ${allObjectives} |\n`;
  }

  const outcomes =
    response.course_description_objectives?.intended_learning_outcomes;
  if (outcomes) {
    const allOutcomes = outcomes
      .map((out) => `• ${escapeMarkdown(out)}`)
      .join('<br>');
    markdown += `| Learning Outcomes | ${allOutcomes} |\n`;
  }

  return markdown;
};

/**
 * Converts a tool response to markdown format based on the tool type
 * @param {Object} response - The response object from the tool
 * @param {string} toolId - The ID of the tool
 * @returns {string} - Formatted markdown string
 */
export const convertResponseToMarkdown = (response, toolId) => {
  if (!response) return '';

  switch (toolId) {
    case TOOLS_ID.MULTIPLE_CHOICE_QUIZ_GENERATOR:
      return convertQuizToMarkdown(response);
    case TOOLS_ID.FLASHCARDS_GENERATOR:
      return convertFlashcardsToMarkdown(response);
    case TOOLS_ID.WORKSHEET_GENERATOR:
      return convertWorksheetToMarkdown(response);
    case TOOLS_ID.SYLLABUS_GENERATOR:
      return convertSyllabusToMarkdown(response);
    default:
      return typeof response === 'string'
        ? response
        : JSON.stringify(response, null, 2);
  }
};
