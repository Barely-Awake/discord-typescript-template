import * as Discord from 'discord.js';

async function execute(message: Discord.Message, args: string[]) {
  message.channel.send("+help - sends this");
}


export default {
  execute: execute
};