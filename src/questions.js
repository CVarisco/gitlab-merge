import { getProjects } from "./api";
import branch from "git-branch";
import Logger from "./utils/logger";

const questions = [
  {
    type: "input",
    name: "title",
    message: "Title of merge request:"
  },
  {
    type: "input",
    name: "source_branch",
    default: branch.sync(),
    message: "Source branch:"
  },
  {
    type: "input",
    name: "target_branch",
    message: "Target Branch:"
  },
  {
    type: "input",
    name: "description",
    message: "Description:"
  }
];

/**
 * Fetch projects from gitlab and return the list of projects as a choice of the question
 * @returns {Object} Question list
 */
async function getProjectIdQuestion() {
  try {
    const projects = await getProjects();
    return {
      type: "list",
      name: "project_id",
      message: "Select project:",
      choices: projects.map(({ id, name }) => ({ name, value: id }))
    };
  } catch (error) {
    Logger.error(error);
  }
}

/**
 * Filter an populate array of questions based on config file
 * @param {*} config
 * @returns {Array} Questions
 */
async function getQuestions(config) {
  const filteredQuestions = questions.filter(
    question => !config[question.name]
  );

  if (!config.project_id) {
    const projectIdQuestion = await getProjectIdQuestion();
    return [projectIdQuestion, ...filteredQuestions];
  }

  return filteredQuestions;
}

export default getQuestions;
