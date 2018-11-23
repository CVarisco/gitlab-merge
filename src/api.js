import ora from 'ora';
import Logger from './utils/logger';
import { get, post } from './utils/http';

/**
 * Get the list of projects based on api_link provided
 * https://docs.gitlab.com/ee/api/projects.html#list-all-projects
 * @returns {Array} project list of projects
 */
async function getProjects() {
  const spinner = ora('Fetching projects').start();
  try {
    const projects = await get({ url: '/projects?per_page=100' });
    spinner.stop();
    return projects;
  } catch (error) {
    spinner.stop();
    return Logger.error('[API]: getProjects()', error.message);
  }
}

/**
 * Create merge request api
 * https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
 * @param {Object} body
 * @returns {String} web_url
 */
async function createMergeRequest(body) {
  const spinner = ora('Creating merge request').start();
  try {
    const res = await post({
      url: `/projects/${body.project_id}/merge_requests`,
      body: {
        ...body,
      },
    });
    spinner.stop();
    return res.web_url;
  } catch (error) {
    spinner.stop();
    return Logger.error('[API]: createMergeRequest()', error.message);
  }
}

export { getProjects, createMergeRequest };
