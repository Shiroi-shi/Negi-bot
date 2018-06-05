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
                "description": "All commands start with the prefix \"**" + config.prefix + "**\" ```\nExample: n:dead```",
                "color": 9699539,
                "fields": [{
                    "name": "Voice channels",
                    "value": "join, leave"
                },
                {
                    "name": "Voice sounds",
                    "value": "heal, angry, boop, boost, mada, ameizing, noon, oulala, scatter, sake, genjo, hanzo, mercy, justice"
                },
                {
                    "name": "Reactions/Actions",
                    "value": "gasm, fuck, scream, kill, stroke, succ, dead, bite, eat, smug, glare, lick, kiss"
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
            "https://imgur.com/U0R3yl9.gif",
            "https://imgur.com/Ecbzbhi.gif",
            "https://imgur.com/RkkLw6p.gif",
            "https://imgur.com/uCt1mrc.gif",
            "https://imgur.com/ycj67ME.gif",
            "https://imgur.com/ddX7P7U.gif"
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
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/8Z35ee1.gif",
            "https://imgur.com/Z6aDXfE.gif",
            "https://imgur.com/uTlNUFO.gif",
            "https://imgur.com/urNYNcF.gif",
            "https://imgur.com/Be1rTkf.gif",
            "https://i.imgur.com/X52oScm.jpg",
            "https://imgur.com/xaNkJR8.gif",
            "https://imgur.com/reIJw1q.gif",
            "https://imgur.com/r7GZddN.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " is fucking with";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
        }
        else {
            msg = "Negi is fucking with " + message.author.username;
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
            "https://imgur.com/NSjPsYw.gif",
            "https://imgur.com/aR6f82U.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": message.author.username + " is screaming",
                }
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
            "https://imgur.com/qfCrU9h.gif",
            "https://imgur.com/cr4PvGP.gif",
            "https://imgur.com/ymcJiS9.gif",
            "https://imgur.com/UPmlUjQ.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " kills";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
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
            "https://imgur.com/vpN7yYJ.gif",
            "https://imgur.com/fsW1uKM.gif",
            "https://imgur.com/8kUQTOB.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " succ";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
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
            msg = message.author.username + " strokes";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
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

    /* dead */
    if (message.content.startsWith(config.prefix + 'dead')) {
        let images = [
            "https://imgur.com/m3NYMZt.gif",
            "https://imgur.com/uTfBuPF.gif",
            "https://imgur.com/Ngt33Gz.gif",
            "https://imgur.com/trpOo5a.gif",
            "https://imgur.com/bfOR0lj.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
                "author": {
                    "name": message.author.username + " is dead",
                }
            }
        });
        console.log(message.author.username + " is dead");
    }

    /* bite */
    if (message.content.startsWith(config.prefix + 'bite')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/oOv4IPN.gif",
            "https://imgur.com/sASlOCE.gif",
            "https://imgur.com/NK0Uy5N.gif",
            "https://imgur.com/IEWTMDT.gif",
            "https://imgur.com/AtiZI76.gif",
            "https://imgur.com/fscyd7Z.gif",
            "https://imgur.com/gSm5uqP.gif",
            "https://imgur.com/AVuSUtP.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " bites";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
        }
        else {
            msg = "Negi bites " + message.author.username;
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
        console.log(message.author.username + " bites");
    }

    /* eat */
    if (message.content.startsWith(config.prefix + 'eat')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/cqKTGor.gif",
            "https://imgur.com/ecrXzhF.gif",
            "https://imgur.com/BwACL3Q.gif",
            "https://imgur.com/nYrkF2L.gif",
            "https://imgur.com/5ScFV5p.gif",
            "https://imgur.com/QcRAZGc.gif",
            "https://imgur.com/rdg4Tvt.gif",
            "https://imgur.com/DgwUeuN.gif",
            "https://imgur.com/QYjOSvp.gif",
            "https://imgur.com/ZG5sUV6.gif",
            "https://imgur.com/2Db73Za.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " gives food to";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
        }
        else {
            msg = message.author.username + " eats";
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
        console.log(message.author.username + " eats");
    }

    /* smug */
    if (message.content.startsWith(config.prefix + 'smug')) {
        let images = [
            "https://imgur.com/BX3es9y.gif",
            "https://imgur.com/wuIiWzj.gif",
            "https://imgur.com/biE8BBV.gif",
            "https://imgur.com/n4W7lUd.gif",
            "https://imgur.com/acud58z.gif",
            "https://imgur.com/oguKFyc.gif",
            "https://imgur.com/j3JFoI0.gif",
            "https://imgur.com/h6LrGXd.gif",
            "https://imgur.com/qEb9KHx.gif",
            "https://imgur.com/p3IA3qM.gif",
            "https://imgur.com/wpeDUUW.gif",
            "https://imgur.com/7F1FrwK.gif",
            "https://imgur.com/qGPJNA2.gif",
            "https://imgur.com/w2TUADR.gif",
            "https://imgur.com/awtqs1Y.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
            }
        });
        console.log(message.author.username + " smug");
    }

    /* glare */
    if (message.content.startsWith(config.prefix + 'glare')) {
        let images = [
            "https://imgur.com/JWJJeze.gif",
            "https://imgur.com/gMPy6R8.gif",
            "https://imgur.com/Vfyjkp0.gif",
            "https://imgur.com/u3RX732.gif",
            "https://imgur.com/3h10R5X.gif",
            "https://imgur.com/6AK0xAT.gif",
            "https://imgur.com/UlTD0Sf.gif",
            "https://imgur.com/Px0D1PW.gif",
            "https://imgur.com/aomXzLO.gif",
            "https://imgur.com/mWUCdT3.gif",
            "https://imgur.com/qxGcAWd.gif"
        ];
        message.channel.send({
            embed: {
                "color": 1703081,
                "image": {
                    "url": images[Math.floor(Math.random() * images.length)]
                },
            }
        });
        console.log(message.author.username + " glare");
    }

    /* lick */
    if (message.content.startsWith(config.prefix + 'lick')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/HQV3MjW.gif",
            "https://imgur.com/jpsF1d6.gif",
            "https://imgur.com/hmzymDS.gif",
            "https://imgur.com/a7zZRgx.gif",
            "https://imgur.com/p5doHTF.gif",
            "https://imgur.com/fBYFAan.gif",
            "https://imgur.com/tuobIS2.gif",
            "https://imgur.com/RYRrHZl.gif",
            "https://imgur.com/SmCgRKc.gif",
            "https://imgur.com/frufXkB.gif",
            "https://imgur.com/11LHvr2.gif",
            "https://imgur.com/uaV1LC9.gif",
            "https://imgur.com/j2l86Ac.gif",
            "https://imgur.com/sH8uy5G.gif",
            "https://imgur.com/SLmLptJ.gif",
            "https://imgur.com/g1aW6Mi.gif",
            "https://imgur.com/MEQTGM1.gif",
            "https://imgur.com/y5POp1M.gif",
            "https://imgur.com/3TUdSXd.gif",
            "https://imgur.com/Xz24icI.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " licks";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
        }
        else {
            msg = "Negi licks " + message.author.username;
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
        console.log(message.author.username + " lick");
    }

    /* kiss */
    if (message.content.startsWith(config.prefix + 'kiss')) {
        let args = message.content.split(' ');
        let images = [
            "https://imgur.com/0Crstey.gif",
            "https://imgur.com/eAt2G4Z.gif",
            "https://imgur.com/rKOivER.gif",
            "https://imgur.com/yRHJwo7.gif",
            "https://imgur.com/NWnEJRq.gif",
            "https://imgur.com/F8lEwZ8.gif",
            "https://imgur.com/i1Wml1Z.gif",
            "https://imgur.com/RzKIyav.gif",
            "https://imgur.com/fYh6mcv.gif",
            "https://imgur.com/XG2GuuT.gif",
            "https://imgur.com/sPmBTFf.gif"
        ];
        if (args[1]) {
            msg = message.author.username + " kiss";
            for (let i = 1; i < args.length; i++) {
                if (args[i].startsWith("<@!")) {
                id = args[i].slice(3, args[i].length - 1)
                user = client.users.get(id)
                msg += " " + user.username;
                }
                else if (args[i].startsWith("<@")) {
                    id = args[i].slice(2, args[i].length - 1)
                    user = client.users.get(id)
                    msg += " " + user.username;
                }
                else {
                    msg += " " + args[i];
                }
            }
        }
        else {
            msg = "Negi kiss " + message.author.username;
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
        console.log(message.author.username + " kiss");
    }

});

client.login(config.token);