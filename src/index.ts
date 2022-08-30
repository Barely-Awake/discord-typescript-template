import { ActivityType, Client, Collection, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { makeHelpEmbeds } from './bot/commands/help.js';
import { commandAdder, eventHandler, taskAdder } from './bot/startUp.js';
import config from './utils/readConfig.js';

const intents = new IntentsBitField().add([
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.GuildPresences,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildMembers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.GuildEmojisAndStickers,
  GatewayIntentBits.DirectMessages,
  GatewayIntentBits.DirectMessageReactions,
  GatewayIntentBits.GuildMessageReactions,
  GatewayIntentBits.MessageContent,
]);

const client = new Client({
  intents: intents,
  presence: {
    status: 'idle',
    activities: [
      {
        name: `@${config.botName} help`,
        type: ActivityType.Watching,
      },
    ],
  },
  failIfNotExists: false,
  allowedMentions: {
    repliedUser: false,
  },
});
client.commands = new Collection();
client.cache = {
  prefixes: {},
};

commandAdder(client.commands)
  .then(() => makeHelpEmbeds(client.commands));
eventHandler(client);
taskAdder(client);

client.login(config.betaMode ? config.betaToken : config.token);
