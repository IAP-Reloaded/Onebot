var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: doc.token
});
var randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!", "r"];
var version = "1.4"
yaml = require('js-yaml');
fs = require('fs');
var sender = "";

function applyVar(thing) {
    test = eval('thing')
    test = test.replace(doc.sendervar, sender);
    test = test.replace(doc.versionvar, version);
    return test
}

var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

if (doc.startupconsole === "") {
    console.log("Started up config successfully!");
} else {
    console.log(doc.startupconsole);
};

bot.on('ready', function(event) {
    if (doc.startupevent === "") {
        bot.sendMessage({
            to: "222393788755083264",
            message: "Logged in as " + bot.username + " (who has ID " + bot.id + ")"
        });
    } else {
        bot.sendMessage({
            to: "222393788755083264",
            message: doc.startupconsole
        });
    }
});

bot.on('message', function(user, userID, channelID, message, event) {
    sender = user;
    if (message === "*ping") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent ping command."
        });
        bot.sendMessage({
            to: channelID,
            message: "Pong!"
        });
    }
    if (message === "*pong") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent pong command."
        });
        bot.sendMessage({
            to: channelID,
            message: "Ping!"
        });
    }
    if (message === "*servers" || message === "*server") {
        var list = Object.keys(bot.servers);
        var stringList = "";
        for (var i = 0; i < list.length; i++) {
            stringList += "* " + list[i] + "\n";
        };
        var serverCount = stringList.split(/\r\n|\r|\n/).length - 1;
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " checked for all servers (currently " + serverCount + ") the bot is used on."
        });
        bot.sendMessage({
            to: channelID,
            message: "I run in the servers:\n```" + stringList + "```\n In total, I run on " + serverCount + " servers."
        });
    }
    if (message === "*ver" || message === "*version") {
        bot.sendMessage({
            to: "222393788755083264",
            message: applyVar(doc.versionevent)
        });
        bot.sendMessage({
            to: channelID,
            message: applyVar(doc.versionreply)
        });
    }
    if (message.startsWith("*repeat ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " made bot repeat: '" + message.match(/^.{8}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            message: message.match(/^.{8}(.*)/)[1]
        });
    }
    if (message.startsWith("*repeatspeech ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " made bot repeat with TTS: '" + message.match(/^.{14}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            tts: true,
            message: message.match(/^.{14}(.*)/)[1]
        });
    }
    if (message.startsWith("*log ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent message to console: '" + message.match(/^.{5}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            message: "I’ve logged that message to console!"
        });
    }
    if (message === "*multiline") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " tested multiline support."
        });
        bot.sendMessage({
            to: channelID,
            message: "I can\nmultiline"
        });
    }
    if (message === "*invite") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for the invite URL."
        });
        bot.sendMessage({
            to: channelID,
            message: "Invite me to your channel by clicking this URL: " + doc.botinviteurl
        });
    }
    if (message === "*language" || message === "*lang") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for the bot’s language."
        });
        bot.sendMessage({
            to: channelID,
            message: "I am coded using the discord.io library! Join the discussion about it at https://discord.gg/7S95Wtj."
        });
    }
    if (message === "*randmsg" || message === "*randommsg") {
        var randmsgr = randmsgs[Math.floor(Math.random() * randmsgs.length)];
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for a random message and got '" + randmsgr + "'."
        });
        bot.sendMessage({
            to: channelID,
            message: randmsgr
        });
    }
    if (message.startsWith("*rand ") || message.startsWith("*random ")) {
        var opt = message.split(" ");
        var min = parseInt(opt[1]);
        var max = parseInt(opt[2]);
        if (!isNaN(min) && !isNaN(max)) {
            var randr = Math.floor(Math.random() * (max - min + 1) + min);
        }
        if (min === "N" && max === "α") {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " asked for a random number (" + min + " through " + max + ") and got an Easter egg."
            });
            bot.sendMessage({
                to: channelID,
                message: "Nanα. He provided the latest version of the random number picker."
            });
        } else {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " asked for a random number (" + min + " through " + max + ") and got '" + randr + "'."
            });
            bot.sendMessage({
                to: channelID,
                message: randr
            });
        }
    }
    if (message.startsWith("*js ")) {
        if (userID === "222369396214071297") {
            var jstest = message.match(/^.{4}(.*)/)[1];
            try {
                eval(bot.sendMessage({
                    to: channelID,
                    message: eval(message.match(/^.{4}(.*)/)[1])
                }));
                eval(bot.sendMessage({
                    to: 222393788755083264,
                    message: eval(user + " ran JavaScript code (`" + jstest + "`) with output: `" + eval(message.match(/^.{4}(.*)/)[1]) + "`.")
                }));
            } catch (err) {
                bot.sendMessage({
                    to: "222393788755083264",
                    message: user + " ran JavaScript code (`" + jstest + "`) with errors: `" + err + "`."
                })
                bot.sendMessage({
                    to: channelID,
                    message: "You got errors: `" + err + "`!"
                });
            }
        } else {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " ran JavaScript code (`" + jstest + "`) without sufficient permission."
            })
            bot.sendMessage({
                to: channelID,
                message: "You are currently not allowed to use this feature. Try again later."
            });
        }
    }
    if (message === "*avatar") {
        bot.editUserInfo({
            avatar: require('fs').readFileSync('defaultorange.txt', 'base64')
        });
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " changed the avatar to code `defaultorange`."
        });
        bot.sendMessage({
            to: channelID,
            message: "Now I’m using the `defaultorange` avatar."
        });
    }
});
