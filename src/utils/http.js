import request from "request-promise";
import config from "../config";

const reqOptions = {
  uri: config.api_link,
  headers: {
    "Private-Token": config.private_token
  },
  json: true
};

const http = method => async ({ url, body }) => {
  return await request({
    ...reqOptions,
    uri: reqOptions.uri + url,
    method,
    body
  });
};

const get = http("GET");
const post = http("POST");

export { get, post };
