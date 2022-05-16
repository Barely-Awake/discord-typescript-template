import client from "../index.js";
import * as Discord from "discord.js";
import config from "../utils/readConfig.js";

async function execute(message: Discord.Message) {
  commandHandler(message);
}

export default {
  settings: {
    once: false,
  },
  execute: execute,
};

function commandHandler(message: Discord.Message) {
  if (!message.content.startsWith(config.prefix))
    return;

  const messageArray = message.content.split(" ");

  let commandName = messageArray[0].toLowerCase();
  commandName = commandName.slice(config.prefix.length);
  const args = messageArray.slice(1);

  const command = client.commands.get(commandName);

  if (!command)
    return;

  command(message, args);
}