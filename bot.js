const Discord = require('discord.js');

const client = new Discord.Client();
const auth = require('./auth.json');
const strings = require('./strings');
const functions = require('./functions');

// client.login(process.env.TOKEN);
client.login(auth.token);

client.on('ready', () => {
  functions.login(client);
});

client.on('message', (msg) => {
  functions.hasTheAuthorTheDefaultAvatar(msg);

  if (msg.channel.name === strings.channelFuntion.rolMastersChannel) {
    if (!msg.content.startsWith('//Inicio') || !msg.content.endsWith('Final//')) {
      msg.delete().catch(console.error(`Borrar mensaje en ${msg.channel.name}`));
      msg.guild.channels
        .find(ch => ch.name === 'conversación_sobre_rol')
        .send(`${msg.author} la plantilla que tienes que usar está en los mensajes fijados (consulta el canal de normas si no sabes que son) de ${msg.channel} y en los mensajes directos (si los tienes abiertos)`)
        .catch(console.error(`mensaje a ${msg.channel.name} para ${msg.author.tag} (plantilla master)`));
      msg.author.send(`La tabla que tienes que rellenar para presentarte como master es esta:
        //Inicio
        Tiempo jugando rol:
        Tiempo dirigiendo rol en físico:
        Tiempo dirigiendo rol online:
        Sistemas dirigidos con frecuencia:
        Sistemas jugados con frecuencia:
        Final//`).catch(console.error(`mensaje a ${msg.author.tag} (plantilla master)`));
    }
  }

  if (msg.channel.name === 'anuncios_de_partidas') {
    if (!msg.content.startsWith('//Inicio') || !msg.content.endsWith('Final//')) {
      msg.delete().catch(console.error(`Borrar mensaje en ${msg.channel.name}`));
      msg.guild.channels
        .find(ch => ch.name === 'conversación_sobre_rol')
        .send(`${msg.author} la plantilla que tienes que usar está en los mensajes fijados (consulta el canal de normas si no sabes que son) de ${msg.channel} y en los mensajes directos (si los tienes abiertos)`)
        .catch(console.error(`mensaje a ${msg.channel.name} para ${msg.author.tag} (plantilla partidas)`));
      msg.author.send(`la tabla que tienes que rellenar para presentar una partida es esta:
        //Inicio
        ***[Nombre Partida]***
        
        **Sistema:** [Juego]
        **Master:** [@tag del master]
        **Rating:** [X/X/X] [Lenguaje/Violencia/Sexual] (del 0 al 3 siendo 0 nada y 3 explícito)
        **Día:** [DD/MM/YY]
        **Hora:** [Hora] [GMT] [País]
        **Premisa:** [Premisa]
        **Jugadores: ** [X/Y] (siendo X las plazas ocupadas e Y las totales)
        
        *imágenes opcionales*
        [Imagen partida vertical]
        [Imagen fondo horizontal]
        Final//
        los //Inicio y Final// **son necesarios**, y actualizar el numero de **Jugadores** tambien`).catch(console.error(`mensaje a ${msg.author.tag} (plantilla partida)`));
    }
  }

  if (msg.content.toLowerCase() === '!theelders') {
    msg.delete().catch(console.error(`Borrar mensaje en ${msg.channel.name}`));
    let listaDeUsuarios = '```-Lista de usuarios según su entrada al server-\n';
    client.guilds.find(a => a.name === 'Lynx Reviewer').fetchMembers().then((server) => {
      const guildList = server.members.array()
        .sort((user1, user2) => user1.joinedTimestamp - user2.joinedTimestamp);
      for (let i = 0; i < 52 && i < guildList.length; i += 1) {
        if (i < 10) {
          listaDeUsuarios += ' ';
        }
        listaDeUsuarios += `${i} - ${guildList[i].user.tag}`;
      }
      listaDeUsuarios += '```';
      msg.author.send(listaDeUsuarios).catch(console.error(`mensaje a ${msg.author.tag} (lista de primeros 52 miembros)`));
    });
  }

  if (msg.content.toLowerCase().startsWith('!patrulla')) {
    if (msg.member.roles != null && msg.member.roles.has('401447862715678730')) {
      const mensaje = msg.content.split(' ').filter(entrada => entrada !== '');
      const persona = msg.mentions.members.first();
      const posDias = mensaje.indexOf('dias');
      if (persona === undefined) {
        msg.channel.send('igual estaría bien que me pusieras a que usuario poner patrulla').catch(console.error(`mensaje de error de patrulla (user) a ${msg.channel.name}`));
      } else if (posDias <= 0) {
        msg.channel.send('¿y la duración de la patrulla que?').catch(console.error(`mensaje de error de patrulla (dias) a ${msg.channel.name}`));
      } else {
        persona.addRole(msg.guild.roles.find(rol => rol.name === 'Con el ojo encima')).catch(console.error(`${msg.author.tag} patrulla a ${persona.user.tag}`));
        msg.channel.send(`${persona} ha sido patrullado por ${msg.author} ${mensaje[posDias - 1]} dias`).catch(console.error(`mensaje de patrulla a ${msg.channel.name}`));
      }
    }
  }

  if (msg.content.startsWith('!clear')) {
    if (msg.member.roles != null && msg.member.roles.has('401447862715678730')) {
      const mensaje = msg.content.split(' ').filter(entrada => entrada !== '');
      if (mensaje.length <= 1 || typeof mensaje[1] === 'number' || mensaje[1] > 100 || mensaje[1] < 0) {
        msg.channel.send('especifica un numero mayor a 0 y menor a 100').catch(console.error(`mensaje de error de clear (numero de mensajes) a ${msg.channel.name}`));
      } else {
        msg.delete().catch(console.error(`Borrar mensaje en ${msg.channel.name}`));
        msg.channel.fetchMessages({ limit: mensaje[1] }).then((mensajes) => {
          mensajes.deleteAll().catch(console.error(strings.botResponse.eraseMessage));
        });
      }
    }
  }
});

client.on('guildMemberAdd', (member) => {
  functions.sendWelcomeMessage(member);
});
