const fs = require('fs');
const strings = require('./strings');

const logTXT = 'log.txt';
const strConsole = strings.console;
const strRole = strings.roles;
const strResponse = strings.responses;
const strOrigin = strings.origin;
const strValue = strings.values;
const strFunction = strings.channelFunction;
const strTemplate = strings.templates;


// Level 1 functions, they are the base of all commands


// Records usefull data from each function
function recordLog(data) {
  const date = new Date();
  console.log(`${date}: ${data} \n`);
  fs.appendFile(logTXT, `${date}: ${data} \n`, (err) => {
    if (err) throw err;
  });
}

// Sends a direct message to a user
function sendDM(receiver, message, origin) {
  receiver.send(message)
    .then(recordLog(`${strConsole.dmMessage} ${receiver.tag} ${origin}`))
    .catch(error => recordLog(error));
}

// Sends a message to a channel
function sendMessageToChannel(channel, message, origin) {
  channel.send(message)
    .then(recordLog(`${strConsole.messageToChannel} ${channel.name} ${origin}`))
    .catch(error => recordLog(error));
}

// Reply to a message
function sendReply(message, response, origin) {
  const toUser = `${strConsole.userToReply} ${message.author.tag}`;
  const toChannel = `${strConsole.replyChannel} ${message.channel.name}`;
  message.reply(response)
    .then(recordLog(`${toUser} ${toChannel} ${origin}`))
    .catch(error => recordLog(error));
}

// Erases the messages
function eraseMessages(order, messageToErrase, origin) {
  messageToErrase.deleteAll();
  recordLog(`${order} by ${order.author.tag} ${origin}`);
}

// Erases the message
function eraseMessage(message, inChannel, origin) {
  message.delete();
  recordLog(`${strConsole.eraseMesagge} ${message} from ${inChannel} ${origin}`);
}


// Level 2 functions, basic treatment of the messages and validation


// Splits a command message into parameters
function splitMessageToParameters(message) {
  return message.content.split(' ').filter(content => content !== '');
}

// Checks if the user is a moderator
function authorIsMod(message) {
  const authorRoles = message.member.roles;
  return authorRoles.find(role => role.name === strRole.moderator2) != null;
}

// Checks that the parameters from clearMessages are correct
function clearWrongRange(parameters) {
  return parameters.length < 2
  || parameters[1] >= 100
  || parameters[1] <= 0;
}

// Check if the channel needs a template
function channelNeedsTemplate(channel) {
  return channel.name === strFunction.rolMastersChannel
  || channel.name === strFunction.rolAnnouncements;
}

// Check if the message has a template
function templateInMessage(message) {
  return message.content.startsWith(strTemplate.startTemplate)
  && message.content.endsWith(strTemplate.endTemplate);
}

// Find a channel
function findChannel(guild, channelToFind) {
  return guild.channels.find(ch => ch.name === channelToFind);
}

// Find a role
function findRole(server) {
  return server.roles.find(role => role.name === strRole.rainbowRole);
}

// Concatenate string variables
function concatenate(var1, var2, var3, var4, var5, var6, var7, var8, var9) {
  let response = `${var1}`;
  if (var2 !== undefined) {
    response += ` ${var2}`;
  }
  if (var3 !== undefined) {
    response += ` ${var3}`;
  }
  if (var4 !== undefined) {
    response += ` ${var4}`;
  }
  if (var5 !== undefined) {
    response += ` ${var5}`;
  }
  if (var6 !== undefined) {
    response += ` ${var6}`;
  }
  if (var7 !== undefined) {
    response += ` ${var7}`;
  }
  if (var8 !== undefined) {
    response += ` ${var8}`;
  }
  if (var9 !== undefined) {
    response += ` ${var9}`;
  }
  return response;
}

// Checks if the bot can send a message to the channel
function noChatChannel(message) {
  return message.channel.name === strFunction.rolAnnouncements
  || message.channel.name === strFunction.rolMastersChannel;
}


// Level 3 functions, executes the principal function


// Gets X number of messages from a channel to erase them (command)
function clearMessages(message) {
  const msgChannel = message.channel;
  if (authorIsMod(message)) {
    const parameters = splitMessageToParameters(message);
    if (clearWrongRange(parameters)) {
      sendMessageToChannel(msgChannel, strResponse.clearRange, strOrigin.clear);
    } else {
      msgChannel.fetchMessages({ limit: parameters[1] }).then((toErase) => {
        eraseMessages(message, toErase, strOrigin.clear);
      });
    }
  }
}

// Registers the bot's login (invoked)
function login(client) {
  const loginLog = `${strConsole.login} ${client.user.tag}`;
  recordLog(loginLog);
}

// Sends a welcome message to the new user (invoked)
function sendWelcomeMessage(receiver) {
  sendDM(receiver, strResponse.newMember, strOrigin.welcome);
}

// Checks if the author has the default avatar and to warn him (invoked)
function hasTheAuthorTheDefaultAvatar(message) {
  if (
    message.author.displayAvatarURL === message.author.defaultAvatarURL
    && !noChatChannel(message)
  ) {
    const channel = findChannel(message.guild, strFunction.rulesChannel);
    const response = `${strResponse.defaultAvatar} ${channel}`;
    sendReply(message, response, strOrigin.defaultAvatar);
  }
}

// Sends the list of first users that joined the server (command)
function firstUsers(message) {
  message.guild.fetchMembers().then((guild) => {
    let userlist = strResponse.userListHeader;
    const guildList = guild.members.array()
      .sort((user1, user2) => user1.joinedTimestamp - user2.joinedTimestamp);
    for (let i = 0; i < strValue.userListMax && i < guildList.length; i += 1) {
      const index = i.toString().padStart(2, ' ');
      userlist += `${index} - ${guildList[i].user.tag}\n`;
    }
    userlist += strResponse.userListTail;
    sendDM(message.member, userlist, strOrigin.firstUsers);
  });
}

// Checks if the message needs a template (invoke)
function messageNeedsTemplate(message) {
  if (channelNeedsTemplate(message.channel) && !templateInMessage(message)) {
    const reply = `${message.author} ${strResponse.wrongTemplate}`;
    const channel = findChannel(message.guild, strFunction.rolConversation);
    sendMessageToChannel(channel, reply, strOrigin.wrongTemplate);
    if (message.channel.name === strFunction.rolMastersChannel) {
      sendDM(message.author, strResponse.rolMasterTemplate, strOrigin.wrongTemplate);
    }
    if (message.channel.name === strFunction.rolAnnouncements) {
      sendDM(message.author, strResponse.rolAnnounceTemplate, strOrigin.wrongTemplate);
    }
    eraseMessage(message, message.channel.name, strOrigin.wrongTemplate);
  }
}

// WIP

// Start a 10 second wait
function delay() {
  return new Promise(resolve => setTimeout(resolve, 10000));
}

// Sends the number of users without avatar and kicks them (command)
function usersWithoutAvatar(message) {
  if (authorIsMod(message)) {
    message.guild.fetchMembers().then(async (guild) => {
      let counter = 0;
      const memberArray = guild.members.array();
      for (let i = 0; i < memberArray.length; i += 1) {
        if (memberArray[i].user.displayAvatarURL === memberArray[i].user.defaultAvatarURL) {
          /* eslint-disable no-await-in-loop */
          await delay().then(console.log(memberArray[i].user.tag));
          await memberArray[i].kick()
            .then(console.log(`${counter} done`))
            .catch(err => console.log(err));
          counter += 1;
        }
      }
      sendDM(message.member, counter, strOrigin.noAvatarUsers);
    });
  }
}
// Starts the process to register a warning
function registerWarning(message) {
  if (authorIsMod(message)) {
    const parameters = splitMessageToParameters(message);
    const moderator = message.author;
    const member = message.mentions.members.first();
    const indexDays = parameters.indexOf(strValue.warningDays);
    const indexCause = parameters.indexOf(strValue.warningCause);
    const indexChannel = parameters.indexOf(strValue.warningChannel);

    sendMessageToChannel(
      findChannel(message.guild, strFunction.testChannel1),
      concatenate(
        member,
        strResponse.warningMessage,
        parameters[indexCause + 1],
        strValue.warningChannel,
        parameters[indexChannel + 1],
        parameters[indexDays - 1],
        strValue.warningDays,
        strValue.warningCause,
        moderator,
      ),
      strOrigin.warning,
    );
    message.member.addRole(findRole(message.guild));
    console.log();
  }
}


// Level 4 functions,


// Checks if the message is a command
function isTheMessageACommand(message) {
  if (message.content.toLowerCase().startsWith('!clear')) {
    clearMessages(message);
  }
  if (message.content.toLowerCase().startsWith('!theelders')) {
    firstUsers(message);
  }
  if (message.content.toLowerCase().startsWith('!noavatar')) {
    usersWithoutAvatar(message);
  }
  // WIP
  if (message.content.toLowerCase().startsWith('!patrulla')) {
    registerWarning(message);
  }
}


module.exports = {
  recordLog, // 1
  sendDM, // 1
  sendMessageToChannel, // 1
  sendReply, // 1
  eraseMessages, // 1
  eraseMessage, // 1
  splitMessageToParameters, // 2
  authorIsMod, // 2
  clearWrongRange, // 2
  channelNeedsTemplate, // 2
  templateInMessage, // 2
  findChannel, // 2
  findRole,
  concatenate,
  noChatChannel,
  login, // 3
  sendWelcomeMessage, // 3
  hasTheAuthorTheDefaultAvatar, // 3
  clearMessages, // 3
  firstUsers, // 3
  delay,
  usersWithoutAvatar,
  registerWarning,
  messageNeedsTemplate, // 3
  isTheMessageACommand, // 4
};
