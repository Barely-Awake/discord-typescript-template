import 'dotenv/config';

export function readConfig(): Config {
  return <Config>{
    token: process.env['TOKEN'],

    prefix: process.env['PREFIX'],
    botName: process.env['BOT_NAME'],
    supportServerId: process.env['SUPPORT_SERVER_ID'],
  };
}

interface Config {
  token: string;

  prefix: string;
  botName: string;
  supportServerId: string;
}

const config = readConfig();
export { config as default };
