import branch from 'git-branch';
import inquirer from 'inquirer';

import { getProjects, getUsersOnProject } from './api';
import Logger from './utils/logger';

const mandatoryQuestions = [
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

const projectIdQuestion = projects => ({
  type: 'list',
  name: 'project_id',
  message: 'Select project:',
  choices: projects.map(({ id, name }) => ({ name, value: id })),
});

const assigneeIdQuestion = users => ({
  type: 'list',
  name: 'assignee_id',
  message: 'Select Assigner:',
  default: false,
  choices: users.map(({ id, name }) => ({ name, value: id })),
});

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

    return projectIdQuestion(projects);
  } catch (error) {
    Logger.error('[QUESTION] getProjectIdQuestion', error);
    return process.exit(1);
  }
}

/**
 * Fetch projects from gitlab and return the list of projects as a choice of the question
 * If not projects found, close the process.
 * @returns {Object} Question
 */
async function getAssigneeIdQuestion(project_id) {
  try {
    const users = await getUsersOnProject(project_id);

    if (!users || (users && !users.length)) {
      Logger.error('[QUESTION] No projects found');
      return process.exit(1);
    }

    return assigneeIdQuestion(users);
  } catch (error) {
    Logger.error('[QUESTION] getProjectIdQuestion', error);
    return process.exit(1);
  }
}

async function askProjectId(config) {
  if (responses.project_id) {
    return responses;
  }

  const projectQuestion = await getProjectIdQuestion();
  const response = await inquirer.prompt(projectQuestion);

  return response;
}

export async function askAssignee(responses) {
  if (responses.assignee_id) {
    return responses;
  }

  const assigneeQuestion = await getAssigneeIdQuestion(responses.project_id);
  const response = await inquirer.prompt(assigneeQuestion);

  return response;
}

async function askMandatoryQuestions(config) {
  const filteredQuestions = mandatoryQuestions.filter(question => !config[question.name]);
  const mandatoryResponses = await inquirer.prompt(filteredQuestions);

  return mandatoryResponses;
}
