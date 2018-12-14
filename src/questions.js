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

const defaultAssignee = {
  name: 'No assignee',
  id: false,
};

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
  choices: [defaultAssignee, ...users].map(({ id, name }) => ({ name: `${name} (${id})`, value: id })),
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
 * Fetch assignee from gitlab and return the list of assignee as a choice of the question
 * If not assignee founded, jump question.
 * @param {Integer} project_id
 * @returns {Object} Question
 */
async function getAssigneeIdQuestion(projectId) {
  try {
    const users = await getUsersOnProject(projectId);

    if (!users || (users && !users.length)) {
      Logger.error('[QUESTION] No assignee found');
      return false;
    }

    return assigneeIdQuestion(users);
  } catch (error) {
    Logger.error('[QUESTION] getAssigneeIdQuestion', error);
    return process.exit(1);
  }
}

/*
 * Check if in config there is a project_id
 * If not, fetch from gitlab the list and ask which one
 * the user wants use to create the merge request
 * @param {Object} config
 * @return {Object} response
 */
export async function askProjectId(responses) {
  if (responses.project_id) {
    return responses;
  }

  const projectQuestion = await getProjectIdQuestion();
  const response = await inquirer.prompt(projectQuestion);

  return response;
}

/*
 * Ask if the user wants assigne the merge request
 * If the user choose from config to not assignee, the assignee id will be none
 * If the user choose to not assignee during the question, the response will be empty object
 * that will be spreaded into the object to make merge request.
 * Because to make the merge request without assignee, the key should not exist in the body
 * of the request.
 * @param {Object} responses
 * @return {Object} response
 */
export async function askAssignee(responses) {
  if (responses.assignee_id || responses.assignee_id === 'none') {
    return responses;
  }

  const assigneeQuestion = await getAssigneeIdQuestion(responses.project_id);
  if (!assigneeQuestion) {
    return responses;
  }

  const response = await inquirer.prompt(assigneeQuestion);
  if (!response.assignee_id) {
    return {};
  }

  return response;
}

/*
 * Filter questions based on config and ask to the user
 * @param {Object} config
 * @return {Object} mandatoryResponses
 */
export async function askMandatoryQuestions(config) {
  const filteredQuestions = mandatoryQuestions.filter(question => !config[question.name]);
  const mandatoryResponses = await inquirer.prompt(filteredQuestions);

  return mandatoryResponses;
}
