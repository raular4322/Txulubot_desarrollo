const Discord = require('discord.js');

const client = new Discord.Client();
const auth = require('./auth.json');
const functions = require('./functions');

// client.login(process.env.TOKEN);
client.login(auth.token);

client.on('ready', () => {
  functions.login(client);
  // setInterval(functions.changeRainbowRoleColor(),50);
});

client.on('message', (msg) => {
  functions.isTheMessageACommand(msg);

  functions.hasTheAuthorTheDefaultAvatar(msg);

  functions.messageNeedsTemplate(msg);
});

client.on('guildMemberAdd', (member) => {
  functions.sendWelcomeMessage(member);
});
