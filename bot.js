const Discord = require('discord.js');

const client = new Discord.Client();
const auth = require('./auth.json');
const functions = require('./functions');

// client.login(process.env.TOKEN);
client.login(auth.token);

client.on('ready', () => {
  functions.login(client);
  // const rainbowRole = client.guilds.find(server => server.name === 'Lynx Reviewer').roles.find(role => role.name === 'rainbowRole');
  // setInterval(() => {
  //  functions.changeRainbowRoleColor(rainbowRole);
  // });
});

client.on('message', (msg) => {
  functions.isTheMessageACommand(msg);

  functions.hasTheAuthorTheDefaultAvatar(msg);

  functions.messageNeedsTemplate(msg);
});

client.on('guildMemberAdd', (member) => {
  functions.sendWelcomeMessage(member);
});
