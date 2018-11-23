import request from "request-promise";
import config from "../config";
import Logger from "./logger";

const reqOptions = {
  uri: config.api_link,
  headers: {
    "Private-Token": config.private_token
  },
  json: true // Automatically parses the JSON string in the response
};

const http = method => async ({ url, body }) => {
  try {
    return await request({
      ...reqOptions,
      uri: reqOptions.uri + url,
      method,
      body
    });
  } catch (error) {
    Logger.error(error);
  }
};

const get = http("GET");
const post = http("POST");

export { get, post };
