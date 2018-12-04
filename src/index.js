#!/usr/bin/env node
import 'babel-polyfill';
import config from './config';
import { askMandatoryQuestions, askAssignee } from './questions';
import art from 'ascii-art';
import { createMergeRequest } from './api';
import Logger from './utils/logger';

async function start() {
  const introMessage = await art.font('gitlab merge', 'Doom').toPromise();
  console.log(introMessage);
  // title, branches, description
  const mandatoryResponses = await askMandatoryQuestions(config);
  // ProjectId
  const responses = await askProjectId({ ...config, ...mandatoryResponses });
  // Assignee
  const responses = await askAssignee({ ...config, ...mandatoryResponses });
  const mergeRequestUrl = await createMergeRequest(responses);
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
