const fs = require("fs");
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
const yt = require('ytdl-core');
const booru = require('booru');
const Cleverbot = require("cleverbot-node");
const clbot = new Cleverbot;
clbot.configure({
    botapi: config.cleverbot
});

client.on('ready', () => {
    console.log('I\'m here!');
    client.user.setActivity('with Mei')
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', message => {

    /* cleverbot */
    if (message.content.startsWith('<@332511504404316171>')) {
        clbot.write(message.content, (response) => {
            message.channel.startTyping();
            setTimeout(() => {
                message.channel.send(response.output).catch(console.error);
                message.channel.stopTyping();
            }, Math.random() * (1 - 3) + 50);
        })
    }
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    /* ping */
    if (message.content.startsWith(config.prefix + 'ping')) {
        message.reply('Pong !');
    }

    /* make my bot talk */
    if (message.content.startsWith(config.prefix + 'msg') && message.author.id === config.ownerID) {
        let msg = message.content.substring(5);
        message.channel.send(msg);
        message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);
    }

    /* join voice channel */
    if (message.content.startsWith(config.prefix + 'join')) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('Can\'t connect to voice channel.');
        voiceChannel.join()
            .then(connection => console.log('Connected to #' + voiceChannel.name + '!'))
            .catch(console.error);
    }

    /* commands list */
    if (message.content.startsWith(config.prefix + 'help')) {
        message.channel.send("**Here is the commands you can use:** ", {
            embed: {
                "title": "Negi help:",
                "color": 9699539,
                "fields": [{
                    "name": config.prefix + "leave",
                    "value": "Leave current voice channel"
                },
                {
                    "name": config.prefix + "heal",
                    "value": "I need healing!"
                },
                {
                    "name": config.prefix + "angry",
                    "value": "Why are you so angry?"
                },
                {
                    "name": config.prefix + "boop",
                    "value": "Boop!"
                },
                {
                    "name": config.prefix + "boost",
                    "value": "Speed boost"
                },
                {
                    "name": config.prefix + "mada",
                    "value": "Mada mada"
                },
                {
                    "name": config.prefix + "ameizing",
                    "value": "A-mei-zing"
                },
                {
                    "name": config.prefix + "noon",
                    "value": "It's high noon!"
                },
                {
                    "name": config.prefix + "oulala",
                    "value": "Ouhlala"
                },
                {
                    "name": config.prefix + "scatter",
                    "value": "Scatter!"
                },
                {
                    "name": config.prefix + "sake",
                    "value": "Sake!"
                },
                {
                    "name": config.prefix + "genjo",
                    "value": "Genji ultimate"
                },
                {
                    "name": config.prefix + "hanzo",
                    "value": "Hanzo ultimate"
                },
                {
                    "name": config.prefix + "mercy",
                    "value": "Mercy ultimate"
                },
                {
                    "name": config.prefix + "play youtubeURL",
                    "value": "Play video sound"
                },
                {
                    "name": config.prefix + "justice",
                    "value": "Pharah ultimate"
                },
                {
                    "name": config.prefix + "gasm",
                    "value": "Gasm reaction"
                },
                {
                    "name": config.prefix + "fuck",
                    "value": "( ͡° ͜ʖ ͡° )"
                },
                {
                    "name": config.prefix + "scream",
                    "value": "scream reaction"
                },
                {
                    "name": config.prefix + "kill",
                    "value": "kill reaction"
                },
                {
                    "name": config.prefix + "stroke",
                    "value": "stroke reaction"
                },
                {
                    "name": config.prefix + "succ",
                    "value": "succ reaction"
                },
                ]
            }
        });
        console.log("help");
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

    /* genjo sound */
    if (message.content.startsWith(config.prefix + 'genjo')) {
        const voiceChannel = message.member.voiceChannel;
        if (voiceChannel)
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/genjo.ogg');
                    console.log("Genjo ult");
                })
                .catch(console.error);
    }

    /* Pharah ult sound */
    if (message.content.startsWith(config.prefix + 'justice')) {
        const voiceChannel = message.member.voiceChannel;
        if (voiceChannel)
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/justice.ogg');
                    console.log("Justice rains from above!");
                })
                .catch(console.error);
    }

    /* Mercy ult sound */
    if (message.content.startsWith(config.prefix + 'mercy')) {
        const voiceChannel = message.member.voiceChannel;
        if (voiceChannel)
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/mercy.ogg');
                    console.log("Heroes never dies!");
                })
                .catch(console.error);
    }

    /* Hanzo sound */
    if (message.content.startsWith(config.prefix + 'hanzo')) {
        const voiceChannel = message.member.voiceChannel;
        if (voiceChannel)
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/hanzo.ogg');
                    console.log("Hanzo ult");
                })
                .catch(console.error);
    }

    /* scatter sound */
    if (message.content.startsWith(config.prefix + 'scatter')) {
        const voiceChannel = message.member.voiceChannel;
        if (voiceChannel)
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/scatter.ogg');
                    console.log("Scatter");
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

    /* porn command */
    if (message.content.startsWith(config.prefix + 'porn')) {
        let args = message.content.split(' ');
        booru.search("pa", [args[1]], {
            limit: 1,
            random: true
        })
            .then(booru.commonfy)
            .then(images => {
                console.log("porn");
                //Log the direct link to each image
                for (let image of images) {
                    console.log(image.common.file_url)

                    message.channel.send({
                        embed: {
                            "title": "link",
                            "url": image.common.file_url,
                            "color": 1703081,
                            "footer": {
                                "text": args[1]
                            },
                            "image": {
                                "url": image.common.file_url
                            },
                            "author": {
                                "name": "Hentai Negi",
                                "icon_url": "http://static3.fjcdn.com/comments/Blank+_73708e5664b4245deda152a8e2b710eb.png"
                            }
                        }
                    });
                }
            })
            .catch(err => {
                if (err.name === 'booruError') {
                    //It's a custom error thrown by the package
                    console.log(err.message)
                } else {
                    //This means I messed up. Whoops.
                    console.log(err)
                }
            })
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
                        console.log("Pause");
                    } else if (m.content.startsWith(config.prefix + 'resume')) {
                        message.channel.send('resumed').then(() => {
                            dispatcher.resume();
                        });
                        console.log("Resumed");
                    } else if (m.content.startsWith(config.prefix + 'volume+')) {
                        if (Math.round(dispatcher.volume * 50) >= 100) return message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
                        message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        console.log("Volume+");
                    } else if (m.content.startsWith(config.prefix + 'volume-')) {
                        if (Math.round(dispatcher.volume * 50) <= 0) return message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
                        message.channel.send(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        console.log("Volume-");
                    }
                });
                dispatcher.on('end', () => {
                    connection.disconnect();
                });
            });
    }


    /* REACTIONS */

    /* gasm */
    if (message.content.startsWith(config.prefix + 'gasm')) {
        let images = [
            "https://imgur.com/ri2lpss.gif",
            "https://imgur.com/hs0yJkN.gif",
            "https://imgur.com/oobuDxI.gif",
            "https://imgur.com/MxsWMCS.gif",
            "https://imgur.com/U0R3yl9.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": message.author.username + " is orgasming",
                }
            }
        });
        console.log(message.author.username + " is orgasming");
    }

    /* fuck */
    if (message.content.startsWith(config.prefix + 'fuck')) {
        let images = [
            "https://imgur.com/8Z35ee1.gif",
            "https://imgur.com/Z6aDXfE.gif",
            "https://imgur.com/uTlNUFO.gif",
            "https://imgur.com/urNYNcF.gif",
            "https://imgur.com/Be1rTkf.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
            }
        });
        console.log(message.author.username + " is fucking");
    }

    /* scream */
    if (message.content.startsWith(config.prefix + 'scream')) {
        let images = [
            "https://imgur.com/UBtHVAy.gif",
            "https://imgur.com/MrF1Fjc.gif",
            "https://imgur.com/Ge7eGl8.gif",
            "https://imgur.com/QtDPZPR.gif",
            "https://imgur.com/redyuQo.gif",
            "https://imgur.com/NSjPsYw.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
            }
        });
        console.log(message.author.username + " is screaming");
    }

    /* kill */
    if (message.content.startsWith(config.prefix + 'kill')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/pNjVzIX.gif",
            "https://imgur.com/B2GGOWh.gif",
            "https://imgur.com/kXpsTOy.gif",
            "https://imgur.com/k0GQrMx.gif",
            "https://imgur.com/cQTwzIg.gif",
            "https://imgur.com/G5XQHJq.gif",
            "https://imgur.com/f7WWFTw.gif",
            "https://imgur.com/qfCrU9h.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " kills " + message.content.substring(6);
        }
        else {
            msg = "Negi kills " + message.author.username;
        }
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": msg,
                }
            }
        });
        console.log(message.author.username + " is killing");
    }

    /* succ */
    if (message.content.startsWith(config.prefix + 'succ')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/YbuTHHo.gif",
            "https://imgur.com/q0VcBxc.gif",
            "https://imgur.com/87DTbT1.gif",
            "https://imgur.com/4hesyl1.gif",
            "https://imgur.com/vpN7yYJ.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " succ " + message.content.substring(6);
        }
        else {
            msg = "Negi succ " + message.author.username;
        }
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": msg,
                }
            }
        });
        console.log(message.author.username + " is sucking");
    }

    /* stroke */
    if (message.content.startsWith(config.prefix + 'stroke')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/Yh7BfUj.gif",
            "https://imgur.com/gzFtMFV.gif",
            "https://imgur.com/5MTuiF5.gif",
            "https://imgur.com/ZOzYlvt.gif",
            "https://imgur.com/ZhD6TNb.gif",
            "https://imgur.com/JcXw7yq.gif",
            "https://imgur.com/FHLRtPM.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " is stroking " + message.content.substring(6);
        }
        else {
            msg = "Negi strokes " + message.author.username;
        }
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": msg,
                }
            }
        });
        console.log(message.author.username + " is stroking");
    }


});

client.login(config.token);