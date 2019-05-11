const channelFunction = {
  serverName: 'Lynx Reviewer',
  rulesChannel: 'leyes_y_normas',
  moderationChannel: 'asientos_de_arena',
  newsChannel: 'anuncios_importantes',
  welcomeChannel: 'gente_nueva',
  testChannel1: 'patata',
  testChannel2: 'bot_de_discord__sugerencias_y_test',
  testChannel3: 'canal_de_testeos',
  galleryFanArtChannel: 'fanartístico_de_lynx',
  galleryMemesChannel2: 'memestico_de_lynx',
  vipChannel: 'la_sala_de_oro',
  vipPlusChannel: 'la_sala_de_platino',
  mainChannel: 'cosas_de_lynx',
  offtopicChannel: 'en_la_mente_de_pazos',
  spamChannel: 'literalmente_spam',
  botChannel: 'facts_retracas',
  foodChannel: 'la_cocina_si_es_con_sal_mejor',
  videogamesChannel: 'videojuegos',
  otakusChannel: 'el_arca_prohibida',
  photosChannel: 'fotitos_e_ilustraciones_guapis',
  narrativeChannel: 'narrativa',
  musicChannel: 'la_deseada_gramola',
  otherChannel: 'manadalr',
  rolMastersChannel: 'masters_aqui',
  rolConversation: 'conversación_sobre_rol',
  rolAnnouncements: 'anuncios_de_partidas',
  rolArchive: 'archivo_de_partidas',
  archive: 'lynx_archive',
  rolChannelVip: 'partida_del_canal',
  rolVoiceChannel1: 'Rol',
  rolVoiceChannel2: 'Más rol',
  rolVoiceChannel3: 'Moar rol',
  rolVoiceChannel4: 'This isnt even my final rol',
  rolVoiceChannel5: 'FrenaRol',
  rolVoiceChannel6: 'Rolazo',
  rolVoiceChannel7: 'Rol and Rock',
  rolVoiceChannel8: 'Roleando que es gerundio',
  rolVoiceChannel9: 'Do a barrel Rol',
  voiceChannel1: 'Discusión General',
  voiceChannel2: 'Jueguis',
  voiceChannel3: 'Discusiones nivel Platon',
  voiceChannel4: 'Directos',
  voiceChannel5: 'Staff',
  voiceChannel6: 'AFK',
  voiceChannel7: 'Sala-de-oro',
  voiceChannel8: 'Sala-de-oro-2.0',
};

const roles = {
  everyone: '@everyone',
  admin: 'Admin',
  moderator1: 'Moderator',
  moderator2: 'Guardián de sal',
  helper: 'Los Randals',
  botRol1: 'Bot de Discordia',
  botRol2: 'Los bots que tenemos',
  warningRoleHard: 'Sordo, ciego, mudo',
  warningRoleSoft: 'Con el ojo encima',
  colaborator: 'Colaborador',
  twitchSubscriber: 'Twitch Subscriber',
  patron: 'Mecenas',
  patronVip: 'Socio Capitalista',
  rolPlayerVip: 'En Cola',
  rolMaster: 'Máster',
  jokeRol1: 'Lector del necronomicón',
  jokeRol2: 'Creador de imágenes',
  jokeRol3: 'Arquitecto de discordia',
  jokeRol4: 'Adalid de almas rotas',
  jokeRol5: 'Tripulantes del Arca',
  jokeRol6: 'Er dealer',
  jokeRol7: 'Primigenia del martillo',
  addedBotRol: 'UB3R-B0T',
  unkownFuction1: 'Bot Admin',
  unkownFuction2: 'Bot Mod',
  rainbowRole: 'rainbowRole',
};

const commands = {
  clear: '!clear',
  warningRole: '!patrulla',
  TopBoard: '!theelders',
};

const responses = {
  newMember: 'Bienvenido al servidor de Lynx Reviewer, aprovecha estos 10 minutos que tienes para leer el canal de leyes_y_normas, porque encontrarás información crucial para tu experiencia en el server. Dicho esto, ¡Gracias por venir y esperamos que te lo pases genial con nosotros!',
  defaultAvatar: 'Lee las normas en',
  clearRange: 'Especifica un numero entero mayor a 0 y menor a 100',
  userListHeader: '```-Lista de usuarios según su entrada al server-\n',
  userListTail: '```',
  wrongTemplate: 'La plantilla que tienes que usar está en los mensajes fijados (consulta el canal de normas si no sabes que son) y en los mensajes directos (si los tienes abiertos)',
  rolMasterTemplate: 'La tabla que tienes que rellenar para presentarte como master es esta:\n//Inicio\nTiempo jugando rol:\nTiempo dirigiendo rol en físico:\nTiempo dirigiendo rol online:\nSistemas dirigidos con frecuencia:\nSistemas jugados con frecuencia:\nFinal//',
  rolAnnounceTemplate: 'La tabla que tienes que rellenar para presentar una partida es esta:\n//Inicio\n***[Nombre Partida]***\n\n**Sistema:** [Juego]\n**Master:** [@tag del master]\n**Rating:** [X/X/X] [Lenguaje/Violencia/Sexual] (del 0 al 3 siendo 0 nada y 3 explícito)\n**Día:** [DD/MM/YY]\n**Hora:** [Hora] [GMT] [País]\n**Premisa:** [Premisa]\n**Jugadores: ** [X/Y] (siendo X las plazas ocupadas e Y las totales)\n\n*imágenes opcionales*\n[Imagen partida vertical]\n[Imagen fondo horizontal]\nFinal//\nlos //Inicio y Final// **son necesarios**, y actualizar el numero de **Jugadores** tambien',
  warningMessage: 'ha sido patrullado por',
};

const console = {
  login: 'Logged as',
  newMember: 'Welcome message send to',
  dmMessage: 'Direct message send to',
  messageToChannel: 'Message to',
  userToReply: 'Reply to',
  replyChannel: 'Reply in',
  eraseMessage: 'The bot erase',
};

const origin = {
  defaultAvatar: '- Default avatar',
  welcome: '- Welcome message',
  clear: '- Clear message',
  firstUsers: '- First members',
  noAvatarUsers: '- Number of members without avatar',
  wrongTemplate: '- wrong or no template',
  warning: 'Warning',
};

const values = {
  userListMax: 51,
  warningDays: 'dias',
  warningChannel: 'en',
  warningCause: 'por',
};

const templates = {
  startTemplate: '//Inicio',
  endTemplate: 'Final//',
};

module.exports = {
  channelFunction,
  roles,
  commands,
  responses,
  console,
  origin,
  values,
  templates,
};
