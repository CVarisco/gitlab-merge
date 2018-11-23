import { homedir } from "os";

const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("gitlab-merge", {
  sync: true,
  stopDir: homedir()
});

const MANDATORY_FIELDS = ["api_link", "private_token"];

/**
 * Check if the mandatory fields are included into the configuration file
 * @param {*} config
 */
const isConfigValid = config => {
  const configKeys = Object.keys(config);
  const contains = MANDATORY_FIELDS.filter(mandatoryField =>
    configKeys.includes(mandatoryField)
  );

  if (contains.length >= MANDATORY_FIELDS.length) {
    return true;
  }

  return false;
};

/**
 * Config object saved once loaded
 */
const config = (() => {
  const getConfig = () => {
    const { config } = explorer.load(process.cwd());

    if (!config) {
      return new Error("Configuration not found");
    }
    if (!config || !isConfigValid(config)) {
      return new Error("Mandatory fields in configuration are missing");
    }
    return config;
  };

  return getConfig();
})();

export default config;
