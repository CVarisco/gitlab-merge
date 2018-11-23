import Logger from "./utils/logger";
import { get, post } from "./utils/http";

/**
 * Get the list of projects based on api_link provided
 * https://docs.gitlab.com/ee/api/projects.html#list-all-projects
 */
async function getProjects() {
  try {
    const projects = await get({ url: "/projects?per_page=100" });
    return projects;
  } catch (error) {
    Logger.error(error);
  }
}

/**
 * Create merge request api
 * https://docs.gitlab.com/ee/api/merge_requests.html#create-mr
 * @param {*} body
 */
async function createMergeRequest(body) {
  try {
    const res = await post({
      url: `/projects/${project_id}/merge_requests`,
      body: { ...body, id: body.project_id }
    });
    return res.web_url;
  } catch (error) {
    Logger.error(error);
  }
}

export { getProjects, createMergeRequest };
