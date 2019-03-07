const fs = require('fs');
const strings = require('./strings');

const log = 'log.txt';

const toConsole = strings.console;
const roleName = strings.roles;
const botResponses = strings.responses;

// Records usefull data from each function
function recordLog(data) {
  const date = new Date();
  fs.appendFile(log, `${date}: ${data} \n`, (err) => {
    if (err) throw err;
    console.log('The log has been saved!');
  });
}

// Registers the bot's login
function login(client) {
  const loginLog = `${toConsole.login} ${client.user.tag}`;
  recordLog(loginLog);
}

// Sends a direct message to a user
function sendDM(receiver, message, origin) {
  const sendDMLog = `${toConsole.dmMessage} ${receiver.user.tag} ${origin}`;
  receiver.send(message)
    .then(recordLog(sendDMLog))
    .catch(error => recordLog(error));
}

// Sends a welcome message to the new user
function sendWelcomeMessage(receiver) {
  sendDM(receiver, botResponses.newMember, strings.origin.welcome);
}

// Sends a message to a channel
function sendMessageToChannel(channel, message, origin) {
  const sendMessageToChannelLog = `${toConsole.messageToChannel} ${channel.name} ${origin}`;
  channel.send(message)
    .then(recordLog(sendMessageToChannelLog))
    .catch(error => recordLog(error));
}

// Reply to a message
function sendReply(message, response, origin) {
  const toAuthor = `${toConsole.replyUser} ${message.author.tag}`;
  const toChannel = `${toConsole.replyChannel} ${message.channel.name}`;
  const sendReplyLog = `${toAuthor} ${toChannel} ${origin}`;
  message.reply(response)
    .then(recordLog(sendReplyLog))
    .catch(error => recordLog(error));
}

// Checks if the author has the default avatar and, if its the case, warns him
function hasTheAuthorTheDefaultAvatar(message) {
  if (message.author.displayAvatarURL === message.author.defaultAvatarURL) {
    sendReply(message, botResponses.defaultAvatar, strings.origin.defaultAvatar);
  }
}

// Checks if the user is a moderator
function authorIsMod(message) {
  const msgMember = message.member;
  if (msgMember.roles != null && msgMember.roles.has(roleName.moderator2 || roleName.moderator1)) {
    return true;
  }
  return false;
}

// Splits a command message into parameters
function splitMessageToParameters(message) {
  return message.content.split(' ').filter(content => content !== '');
}

// Gets X number of messages from a channel to erase them
function clearMessages(message) {
  if (authorIsMod()) {
    const parameters = splitMessageToParameters(message);
    if (parameters.length < 2 || typeof parameters[1] === 'number' || parameters[1] > 100 || parameters[1] < 0) {
      sendMessageToChannel(message.channel, botResponses.clearWrongRange, strings.origin.clear);
    } else {
      message.channel.fetchMessages({ limit: parameters[1] }).then((messages) => {
        console.log(`${messages} WIP FUNCTION`);
      });
    }
  }
}

// Checks if the message is a command
function isTheMessageACommand(message) {
  if (message.content.startsWith('!clear')) {
    clearMessages(message);
  }
  if (message.content.toLowerCase().startsWith('!patrulla')) {
    console.log('patrulla');
  }
  if (message.content.toLowerCase() === '!theelders') {
    console.log('theelders');
  }
  if (message.channel.name === 'anuncios_de_partidas') {
    console.log('anuncios');
  }
  if (message.channel.name === strings.channelFuntion.rolMastersChannel) {
    console.log('master');
  }
}


module.exports = {
  recordLog,
  login,
  sendWelcomeMessage,
  sendDM,
  sendMessageToChannel,
  hasTheAuthorTheDefaultAvatar,
  sendReply,
  isTheMessageACommand,
  splitMessageToParameters,
  clearMessages,
  authorIsMod,
};
