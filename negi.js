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

  // Exit and stop if it's not there
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
  if (message.content.startsWith(config.prefix + 'join')) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Can\'t connect to voice channel.');
    voiceChannel.join()
      .then(connection => console.log('Connected to #' + voiceChannel.name + '!'))
      .catch(console.error);
  }
  if (message.content.startsWith(config.prefix + 'leave')) {
    const voiceChannel = message.member.voiceChannel;
    if (voiceChannel)
      voiceChannel.leave();
    console.log('Leaving #' + voiceChannel.name + '!');
  }
  if (message.content.startsWith(config.prefix + 'heal')) {
    const voiceChannel = message.member.voiceChannel;
    voiceChannel.join()
      .then(connection => {
        const dispatcher = connection.playFile('./sounds/healing.ogg');
      })
      .catch(console.error);
  }
  if (message.content.startsWith(config.prefix + 'play')) {
    let args = message.content.split(' ');
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Can\'t connect to voice channel.');
    voiceChannel.join()
      .then(connnection => {});
    let stream = yt(args[1], {
      filter: 'audioonly',
    });
    stream.on('error', function () {
      message.reply("Je n'ai pas réussi à lire cette vidéo :(");
      message.guild.voiceConnection.disconnect();
    });
    const dispatcher = message.guild.voiceConnection.playStream(stream);
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
      message.guild.voiceConnection.disconnect();
    });
  }
});

client.login(config.token);