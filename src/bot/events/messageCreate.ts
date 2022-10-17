import { Message } from 'discord.js';
import config from '../../utils/readConfig.js';
import { Settings } from './_event.js';

export default function (message: Message) {
  commandHandler(message);
}

async function commandHandler(message: Message) {

  let messageContent = message.content;
  if (message.content.startsWith(config.prefix))
    messageContent = message.content.slice(config.prefix.length);
  else if (message.content.startsWith(`${(message?.client?.user || config.prefix).toString()} `))
    messageContent = message.content.slice(`${(message?.client?.user || config.prefix).toString()} `.length);
  else if (message.content.startsWith((message?.client?.user || config.prefix).toString()))
    messageContent = message.content.slice((message?.client?.user || config.prefix).toString().length);
  else return;

  const messageArray = messageContent.split(' ');

  const commandName = messageArray[0].toLowerCase();
  const args = messageArray.slice(1);

  const commandClass = message.client.commands.get(commandName);

  if (commandClass === undefined)
    return;

  try {
    await message.channel.sendTyping();
    const startTime = new Date().getTime();
    await commandClass.command(message, args);
    const currentTime = new Date().getTime();
    console.log(
      `${message.author.tag} ran command '${commandName}' in ${message.guild?.name || 'dms'} ` +
      `(${currentTime - startTime}ms elapsed)`,
    );
  } catch (err) {
    await message.reply(
      `An unknown error occurred with the command: \`${commandName}\`. Logs have been sent to the developers.` +
      `If this error continues, please join the support discord and let us know in #support.`,
    );
    console.error(`An unknown error occurred with the command: ${commandName}. Error:\n`, err);
  }
}

export const settings: Settings = {
  once: false,
};
