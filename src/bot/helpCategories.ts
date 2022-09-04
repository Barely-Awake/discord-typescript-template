import { EmbedBuilder, SelectMenuComponentOptionData } from 'discord.js';

// Keep this updated with the keys of the category info object
export type CommandCategory = 'info' | 'exampleCategory';

export const categoryInfo: { [index: string]: CategoryInfo } = {
  exampleCategory: {
    description: 'This field will show up under the description of the category',
    label: 'This will be the user facing name of the category',
    value: 'exampleCategory', // Value should be the same as the object key
    embed: new EmbedBuilder(),
  },
  info: {
    description: 'Commands providing basic information like the help command',
    label: 'Info',
    value: 'info',
    embed: new EmbedBuilder(),
  },
};

export interface CategoryInfo extends SelectMenuComponentOptionData {
  embed: EmbedBuilder;
}
