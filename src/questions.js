import branch from 'git-branch';
import { getProjects } from './api';
import Logger from './utils/logger';

const questions = [
  {
    type: 'input',
    name: 'title',
    default: 'WIP: MR',
    message: 'Title of merge request:',
  },
  {
    type: 'input',
    name: 'source_branch',
    default: branch.sync(),
    message: 'Source branch:',
  },
  {
    type: 'input',
    name: 'target_branch',
    default: 'master',
    message: 'Target Branch:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Description:',
  },
];

/**
 * Fetch projects from gitlab and return the list of projects as a choice of the question
 * If not projects found, close the process.
 * @returns {Object} Question
 */
async function getProjectIdQuestion() {
  try {
    const projects = await getProjects();

    if (!projects || (projects && !projects.length)) {
      Logger.error('[QUESTION] No projects found');
      return process.exit(1);
    }

    return {
      type: 'list',
      name: 'project_id',
      message: 'Select project:',
      choices: projects.map(({ id, name }) => ({ name, value: id })),
    };
  } catch (error) {
    Logger.error('[QUESTION] getProjectIdQuestion', error);
    return process.exit(1);
  }
}

/**
 * Filter an populate array of questions based on config file
 * @param {Object} config
 * @returns {Array} Questions
 */
async function getQuestions(config) {
  const filteredQuestions = questions.filter(question => !config[question.name]);

  if (!config.project_id) {
    const projectIdQuestion = await getProjectIdQuestion();
    return [projectIdQuestion, ...filteredQuestions];
  }

  return filteredQuestions;
}

export default getQuestions;
