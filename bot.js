const Discord = require('discord.js');

const client = new Discord.Client();
const auth = require('./auth.json');
const functions = require('./functions');

// client.login(process.env.TOKEN);
client.login(auth.token);

client.on('ready', () => {
  functions.login(client);
});

client.on('message', (msg) => {
  functions.isTheMessageACommand(msg);

  functions.hasTheAuthorTheDefaultAvatar(msg);

  functions.messageNeedsTemplate(msg);
/*
  //if (msg.content.toLowerCase().startsWith('!patrulla')) {
    //if (msg.member.roles != null && msg.member.roles.has('401447862715678730')) {
      //const mensaje = msg.content.split(' ').filter(entrada => entrada !== '');
      //const persona = msg.mentions.members.first();
      //const posDias = mensaje.indexOf('dias');
      if (persona === undefined) {
        msg.channel.send('igual estaría bien que me pusieras a que usuario poner patrulla').catch(console.error(`mensaje de error de patrulla (user) a ${msg.channel.name}`));
      } else if (posDias <= 0) {
        msg.channel.send('¿y la duración de la patrulla que?').catch(console.error(`mensaje de error de patrulla (dias) a ${msg.channel.name}`));
      } else {
        persona.addRole(msg.guild.roles.find(rol => rol.name === 'Con el ojo encima')).catch(console.error(`${msg.author.tag} patrulla a ${persona.user.tag}`));
        msg.channel.send(`${persona} ha sido patrullado por ${msg.author} ${mensaje[posDias - 1]} dias`).catch(console.error(`mensaje de patrulla a ${msg.channel.name}`));
      }
    //}
  //}
  */
});

client.on('guildMemberAdd', (member) => {
  functions.sendWelcomeMessage(member);
});
