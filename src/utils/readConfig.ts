import { readFileSync } from "fs";

export function readConfig(): Config {
  const configFile = readFileSync("config.json");
  return JSON.parse(configFile.toString());
}


interface Config {
  token: string;
  prefix: string;
}

const config = readConfig();
export { config as default };