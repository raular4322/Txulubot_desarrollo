const fs = require('fs');
const strings = require('./strings');

const logTXT = 'log.txt';
const log = strings.console;
const roleName = strings.roles;
const botResponse = strings.responses;
const strOrigin = strings.origin;
const value = strings.values;

// Level 1 functions, they are the base of all commands


// Records usefull data from each function
function recordLog(data) {
  const date = new Date();
  fs.appendFile(logTXT, `${date}: ${data} \n`, (err) => {
    if (err) throw err;
  });
}

// Sends a direct message to a user
function sendDM(receiver, message, origin) {
  receiver.send(message)
    .then(recordLog(`${log.dmMessage} ${receiver.user.tag} ${origin}`))
    .catch(error => recordLog(error));
}

// Sends a message to a channel
function sendMessageToChannel(channel, message, origin) {
  channel.send(message)
    .then(recordLog(`${log.messageToChannel} ${channel.name} ${origin}`))
    .catch(error => recordLog(error));
}

// Reply to a message
function sendReply(originalMessage, response, origin) {
  const toUser = `${log.userToReply} ${originalMessage.author.tag}`;
  const toChannel = `${log.replyChannel} ${originalMessage.channel.name}`;
  originalMessage.reply(response)
    .then(recordLog(`${toUser} ${toChannel} ${origin}`))
    .catch(error => recordLog(error));
}

// Erases the messages
function eraseMessage(order, messageToErrase, origin) {
  messageToErrase.deleteAll();
  recordLog(`${order} by ${order.author.tag} ${origin}`);
}


// Level 2 functions, basic treatment of the messages and validation


// Splits a command message into parameters
function splitMessageToParameters(message) {
  return message.content.split(' ').filter(content => content !== '');
}

// Checks if the user is a moderator
function authorIsMod(message) {
  const authorRoles = message.member.roles;
  return authorRoles.find(role => role.name === roleName.moderator2) != null;
}

// Checks that the parameters from clearMessages are correct
function clearWrongRange(parameters) {
  return parameters.length < 2
  || parameters[1] >= 100
  || parameters[1] <= 0;
}

// Checks if the bot can send a message to the channel
function noChatChannel(message) {
  return message.channel.name === strings.channelFunction.rolAnnouncements
  || message.channel.name === strings.channelFunction.rolMastersChannel;
}


// Level 3 functions, executes the principal function


// Registers the bot's login
function login(client) {
  const loginLog = `${log.login} ${client.user.tag}`;
  recordLog(loginLog);
}

// Sends a welcome message to the new user
function sendWelcomeMessage(receiver) {
  sendDM(receiver, botResponse.newMember, strOrigin.welcome);
}

// Checks if the author has the default avatar and, if its the case, warns him
function hasTheAuthorTheDefaultAvatar(message) {
  if (
    message.author.displayAvatarURL === message.author.defaultAvatarURL
    && !noChatChannel(message)
  ) {
    sendReply(message, botResponse.defaultAvatar, strOrigin.defaultAvatar);
  }
}

// Gets X number of messages from a channel to erase them
function clearMessages(message) {
  const msgChannel = message.channel;
  if (authorIsMod(message)) {
    const parameters = splitMessageToParameters(message);
    if (clearWrongRange(parameters)) {
      sendMessageToChannel(msgChannel, botResponse.clearRange, strOrigin.clear);
    } else {
      msgChannel.fetchMessages({ limit: parameters[1] }).then((toErase) => {
        eraseMessage(message, toErase, strOrigin.clear);
      });
    }
  }
}

// Sends the list of first users that joined the server
function firstUsers(message) {
  message.guild.fetchMembers().then((guild) => {
    let userlist = botResponse.userListHeader;
    const guildList = guild.members.array()
      .sort((user1, user2) => user1.joinedTimestamp - user2.joinedTimestamp);
    for (let i = 0; i < value.userListMax && i < guildList.length; i += 1) {
      const index = i.toString().padStart(2, ' ');
      userlist += `${index} - ${guildList[i].user.tag}\n`;
    }
    userlist += botResponse.userListTail;
    sendDM(message.member, userlist, strOrigin.firstUsers);
  });
}

// Sends the number of users without avatar
function usersWithoutAvatar(message) {
  if (authorIsMod(message)) {
    message.guild.fetchMembers().then((guild) => {
      let counter = 0;
      guild.members.array().forEach((member) => {
        if (member.user.displayAvatarURL === member.user.defaultAvatarURL) {
          counter += 1;
        }
      });
      sendDM(message.member, counter, strOrigin.noAvatarUsers);
    });
  }
}


// Level 4 functions,


// Checks if the message is a command
function isTheMessageACommand(message) {
  if (message.content.toLowerCase().startsWith('!clear')) {
    clearMessages(message);
  }
  if (message.content.toLowerCase().startsWith('!patrulla')) {
    console.log('patrulla');
  }
  if (message.content.toLowerCase().startsWith('!theelders')) {
    firstUsers(message);
  }
  if (message.channel.name === 'anuncios_de_partidas') {
    console.log('anuncios');
  }
  if (message.content.toLowerCase().startsWith('!noavatar')) {
    usersWithoutAvatar(message);
  }
  if (message.channel.name === strings.channelFunction.rolMastersChannel) {
    console.log('master');
  }
}


module.exports = {
  recordLog,
  sendDM,
  sendMessageToChannel,
  sendReply,
  eraseMessage, // 2
  splitMessageToParameters, // 2
  authorIsMod, // 2
  clearWrongRange, // 2
  login, // 3
  sendWelcomeMessage, // 3
  hasTheAuthorTheDefaultAvatar, // 3
  clearMessages, // 3
  firstUsers, // 3
  usersWithoutAvatar, // 3
  isTheMessageACommand,
};
