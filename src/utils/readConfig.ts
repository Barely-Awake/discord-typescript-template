import 'dotenv/config';

export function readConfig(): Config {
  return <Config>{
    token: process.env['TOKEN'],

    prefix: process.env['PREFIX'],
    botName: process.env['BOT_NAME'],
  };
}

interface Config {
  token: string;

  prefix: string;
  botName: string;
}

const config = readConfig();
export { config as default };
