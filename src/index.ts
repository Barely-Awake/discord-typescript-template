import * as Discord from 'discord.js';
import { readdir } from 'fs/promises';
import config from './utils/readConfig.js';

const intents = new Discord.Intents();
intents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES);


const client: any = new Discord.Client({ intents: intents, });

export { client as default };

client.commands = new Discord.Collection();
commandAdder();

client.events = new Discord.Collection();
eventHandler();

async function commandAdder() {
  const commandFiles = await readdir('./dist/commands');

  for (const file of commandFiles) {

    if (!file.endsWith('.js') || file.startsWith('_'))
      continue;

    const command = await import(`./commands/${file}`);
    let commandName = file.split('.')[0];

    client.commands.set(commandName, command.default.execute);
  }
}

async function eventHandler() {
  const eventFiles = await readdir('./dist/events');

  for (const file of eventFiles) {

    if (!file.endsWith('.js') || file.startsWith('_'))
      continue;


    const event = await import(`./events/${file}`);

    let eventName = file.split('.')[0];
    if (event.default.settings.once)
      client.once(eventName, (...args: string[]) => event.default.execute(...args));
    else
      client.on(eventName, (...args: string[]) => event.default.execute(...args));
  }
}

client.login(config.token);