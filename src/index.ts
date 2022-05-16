import * as Discord from 'discord.js';
import { readdir } from 'fs/promises';
import config from './utils/readConfig.js';

const intents = new Discord.Intents();
intents.add(Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES);

const client = new Discord.Client({intents: intents});
const clientCollections = {
  commands: new Discord.Collection(),
  events: new Discord.Collection(),
};

export { clientCollections as default };

commandAdder();
eventHandler();

async function commandAdder(pathAdditions: string = '') {
  const commandFiles = await readdir('./dist/commands' + pathAdditions);

  for (const file of commandFiles) {

    if (file.startsWith('_') || (file.includes('.') && !file.endsWith('.js')))
      continue;

    if (!file.endsWith('.js')) {
      await commandAdder(pathAdditions + '/' + file);
      continue;
    }

    const command = await import(`./commands${pathAdditions}/${file}`);
    let commandName = file.split('.')[0];

    clientCollections.commands.set(commandName, command.default);
    console.log(`Loaded command: ${commandName}`);
    if (command.description.aliases === undefined)
      continue;

    for (let i in command.description.aliases) {
      clientCollections.commands.set(command.description.aliases[i], command.default);
    }
  }
}

async function eventHandler(pathAdditions: string = '') {
  const eventFiles = await readdir('./dist/events' + pathAdditions);

  for (const file of eventFiles) {

    if (file.startsWith('_') || (file.includes('.') && !file.endsWith('.js')))
      continue;

    if (!file.endsWith('.js'))
      await eventHandler(pathAdditions + '/' + file);

    const event = await import(`./events${pathAdditions}/${file}`);

    let eventName = file.split('.')[0];
    if (event.settings.once)
      client.once(eventName, (...args: string[]) => event.default(...args));
    else
      client.on(eventName, (...args: string[]) => event.default(...args));
  }
}

client.login(config.token);