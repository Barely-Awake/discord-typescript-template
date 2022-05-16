import * as Discord from 'discord.js';
import { readdirSync } from 'fs';
import { DescriptionTypes } from './_example.js';
import config from '../utils/readConfig.js';

export default async function (message: Discord.Message, args: string[]) {
  await message.delete();
  let helpMessage = '```css\n';
  helpMessage += `${config.botName}\n[] - Mandatory arguments\n<> - Optional arguments\n| - OR\n\n`;

  let i = 1;

  async function fileLoop(pathAdditions: string = '') {
    const files = readdirSync('./dist/commands' + pathAdditions);

    for (const file of files) {
      if (file.startsWith('_') || (file.includes('.') && !file.endsWith('.js')))
        continue;

      if (!file.endsWith('.js')) {
        await fileLoop(pathAdditions + '/' + file);
        continue;
      }

      let importedFile;
      if (pathAdditions === '')
        importedFile = await import('./' + file);
      else
        importedFile = await import('.' + pathAdditions + '/' + file);

      let fileDescription: DescriptionTypes = importedFile.description;

      if (!fileDescription)
        continue;

      helpMessage += `[${i}] ` + `${config.prefix}${fileDescription.usage}\n\t  ${fileDescription.description}\n`;
      i++;
    }
  }

  await fileLoop();

  return message.channel.send(helpMessage + '\n```');
}

export const description = {
  name: 'help',
  description: 'Shows help message.',
  usage: 'help',
};