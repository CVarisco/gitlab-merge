#!/usr/bin/env node
import 'babel-polyfill';
import art from 'ascii-art';
import config from './config';
import { askMandatoryQuestions, askAssignee, askProjectId } from './questions';
import { createMergeRequest } from './api';
import Logger from './utils/logger';

const packageJson = require('../package.json');

async function start() {
  const introMessage = await art.font('gitlab merge', 'Doom').toPromise();
  console.log(introMessage);
  console.log(`Version: v${packageJson.version}`);

  // title, branches, description
  const mandatoryResponses = await askMandatoryQuestions(config);
  // ProjectId
  const { project_id: projectId } = await askProjectId({ ...config, ...mandatoryResponses });
  // Assignee optional
  const assigneeId = await askAssignee({ ...config, ...mandatoryResponses, project_id: projectId });
  const mergeRequestUrl = await createMergeRequest({
    ...config,
    ...mandatoryResponses,
    project_id: projectId,
    ...assigneeId,
  });
  console.log('\n');
  Logger.log(`Your merge request is created at: ${mergeRequestUrl}`);
}

/**
 * Process flow of the application:
 * 1) Get MANDATORY config file. (src/config.js)
 * 2) Ask questions to populate object to create merge request
 * 3) Create merge request thought API call
 */
start();
