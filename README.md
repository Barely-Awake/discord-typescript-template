# Discord.JS Bot Template
## Why?
This is a template I personally use and find useful. You may be 
thinking, "There are 1000 other templates, why not just use 
another one?" The reason I created this one is that almost
every other template I found was either too complicated or 
not up to date. This template is simple, easy to understand,
and up to date.

It also doesn't have any useless commands. The only command I
have prebuilt is the help command. It's dynamic, so as long as
you setup the description of the commands you make, the help
command will automatically generate a list of commands.

## Structure
I tried to make it easy to understand, but I think it's useful
to have this explanation here. First I'll lay out the file
structure, then I'll what each file does, and it's purpose.
```
    - src
        - bot
            - commands
                - _example.ts
                - help.ts
            - events
                - _example.ts
                - messageCreate.ts
        - utils
            - readConfig.ts
```

The bot folder is for everything related to the discord bot. If 
you want to add any files related to the bot it's recommended to 
keep it in that folder. 

*For both the commands and events folders, any file starting with
an "_" is ignored*

The commands folder is for all the commands you want to add to the 
bot. You can add as many commands as you want, and you can also add
folders to organize them. Everything will still work just fine. For
every command you add you can simply add a file to the commands then
copy the code from the _example.ts file (Except for the description
types part, you should import that in the command file). 

*Make sure to add the command description as that's what the help
command uses to generate the list of commands.*

The events folder is much the same as the commands folder, you can
add folders to organize them, 