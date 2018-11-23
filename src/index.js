#!/usr/bin/env node
import "babel-polyfill";
import inquirer from "inquirer";
import config from "./config";
import getQuestions from "./questions";

async function start() {
  const questions = await getQuestions(config);
  const responses = await inquirer.prompt(questions);
  console.log(responses);
}

start();
