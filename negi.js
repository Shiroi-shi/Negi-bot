const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const yt = require('ytdl-core');
var Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
clbot.configure({
  botapi: config.cleverbot
});

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {

  /* cleverbot */
  if (message.content.startsWith('<@332511504404316171>')) {
    clbot.write(message.content, (response) => {
      message.channel.startTyping();
      setTimeout(() => {
        message.channel.send(response.output).catch(console.error);
        message.channel.stopTyping();
      }, Math.random() * (1 - 3) + 1 * 500);
    })
  }
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.content.startsWith(config.prefix + 'ping')) {
    message.reply('Pong !');
  }

  /* join voice channel */
  if (message.content.startsWith(config.prefix + 'join')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Can\'t connect to voice channel.');
    voiceChannel.join()
      .then(connection => console.log('Connected to #' + voiceChannel.name + '!'))
      .catch(console.error);
  }

  /* leave voice channel */
  if (message.content.startsWith(config.prefix + 'leave')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.leave();
    console.log('Leaving #' + voiceChannel.name + '!');
  }

  /* heal sound */
  if (message.content.startsWith(config.prefix + 'heal')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/healing.ogg');
        console.log("Healing");
      })
      .catch(console.error);
  }

    /* angry sound */
  if (message.content.startsWith(config.prefix + 'angry')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/angry.ogg');
        console.log("Angry");
      })
      .catch(console.error);
  }

    /* boop sound */
  if (message.content.startsWith(config.prefix + 'boop')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/boop.ogg');
        console.log("Boop");
      })
      .catch(console.error);
  }

    /* boost sound */
  if (message.content.startsWith(config.prefix + 'boost')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/boost.mp3');
        console.log("Speeeed boost");
      })
      .catch(console.error);
  }

    /* mada sound */
  if (message.content.startsWith(config.prefix + 'mada')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/mada.ogg');
        console.log("Mada mada");
      })
      .catch(console.error);
  }

    /* meizing sound */
  if (message.content.startsWith(config.prefix + 'ameizing')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/meizing.mp3');
        console.log("A-mei-zing");
      })
      .catch(console.error);
  }

    /* noon sound */
  if (message.content.startsWith(config.prefix + 'noon')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/noon.ogg');
        console.log("It's hiiiigh noon");
      })
      .catch(console.error);
  }

    /* oulala sound */
  if (message.content.startsWith(config.prefix + 'oulala')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/oulala.ogg');
        console.log("Ouhlala");
      })
      .catch(console.error);
  }

    /* sake sound */
  if (message.content.startsWith(config.prefix + 'sake')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/sake.ogg');
        console.log("Sake!");
      })
      .catch(console.error);
  }

    /* yay sound */
  if (message.content.startsWith(config.prefix + 'yay')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/yay.mp3');
        console.log("Yay");
      })
      .catch(console.error);
  }

  /* Play video command */
  if (message.content.startsWith(config.prefix + 'play')) {
    let args = message.content.split(' ');
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply(' I can\'t connect to a voice channel.');
    voiceChannel.join()
      .then(connection => {
        let stream = yt(args[1], {
          filter: 'audioonly',
        });
        stream.on('error', function () {
          message.reply("Je n'ai pas réussi à lire cette vidéo :(");
          connection.disconnect();
        });
        yt.getInfo(args[1], function (err, info) {
          console.log("Playing " + info.title);
        });
        const dispatcher = connection.playStream(stream);
        let collector = message.channel.createCollector(m => m);
        collector.on('collect', m => {
          if (m.content.startsWith(config.prefix + 'pause')) {
            message.channel.send('paused').then(() => {
              dispatcher.pause();
            });
          } else if (m.content.startsWith(config.prefix + 'resume')) {
            message.channel.send('resumed').then(() => {
              dispatcher.resume();
            });
          } else if (m.content.startsWith(config.prefix + 'volume+')) {
            if (Math.round(dispatcher.volume * 50) >= 100) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
            message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          } else if (m.content.startsWith(config.prefix + 'volume-')) {
            if (Math.round(dispatcher.volume * 50) <= 0) return message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
            dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
            message.channel.send(`Volume: ${Math.round(dispatcher.volume*50)}%`);
          }
        });
        dispatcher.on('end', () => {
          connection.disconnect();
        });
      });
  }
});

client.login(config.token);