const fs = require('fs');
const strings = require('./strings');

const log = 'log.txt';
const toConsole = strings.console;

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
  sendDM(receiver, strings.responses.newMember, strings.origin.welcome);
}

// Sends a message to a channel
function sendMessageToChannel(channel, message) {
  const sendMessageToChannelLog = `${toConsole.messageToChannel} ${channel.name}`;
  channel.send(message)
    .then(recordLog(sendMessageToChannelLog))
    .catch(error => recordLog(error));
}

// Reply to a message
function sendReply(msg, response, origin) {
  const toAuthor = `${toConsole.replyUser} ${msg.author.tag}`;
  const toChannel = `${toConsole.replyChannel} ${msg.channel.name}`;
  const sendReplyLog = `${toAuthor} ${toChannel} ${origin}`;
  msg.reply(response)
    .then(recordLog(sendReplyLog))
    .catch(error => recordLog(error));
}

// Checks if the author has the default avatar and, if its the case, warns him
function hasTheAuthorTheDefaultAvatar(msg) {
  if (msg.author.displayAvatarURL === msg.author.defaultAvatarURL) {
    sendReply(msg, strings.responses.defaultAvatar, strings.origin.defaultAvatar);
  }
}

// Checks if the message is a command
function isTheMessageACommand(message) {
  if (message.content.startsWith('!clear')) {
    console.log('clear');
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

// Deletes X number of messages from a channel
function clearMessages() {

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
  clearMessages,
};
