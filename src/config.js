import { homedir } from "os";
import Logger from "./utils/logger";

const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("gitlab-merge", {
  sync: true,
  stopDir: homedir()
});

const MANDATORY_FIELDS = ["api_link", "private_token"];

/**
 * Check if the mandatory fields are included into the configuration file
 * @param {Object} config
 * @returns {Boolean}
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
 * If no config is found or are missing mandatory fields, close the process.
 */
const config = (() => {
  const getConfig = () => {
    const configFile = explorer.load(process.cwd());

    if (!configFile) {
      Logger.error("[CONF] Configuration not found");
      return process.exit(1);
    }

    if (!configFile.config || !isConfigValid(configFile.config)) {
      Logger.error(
        `[CONF] Mandatory fields in configuration are missing (${MANDATORY_FIELDS.join(
          ", "
        )})`
      );
      return process.exit(1);
    }

    return configFile.config;
  };

  return getConfig();
})();

export default config;
