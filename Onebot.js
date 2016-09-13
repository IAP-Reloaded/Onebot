var yaml = require('js-yaml');
var fs = require('fs');
var mainplugin = require('./plugins/Main.obp');
var repeatplugin = require('./plugins/Repeat.obp');
var versionplugin = require('./plugins/Version.obp');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: doc.token
});

var randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!", "r"];
var version = "1.5.2";
var sender = "";

function applyVar(thing) {
    test = eval('thing');
    test = test.replace(doc.sendervar, sender);
    test = test.replace(doc.versionvar, version);
    return test;
}

if (doc.startupconsole === "") {
    console.log("Started up config successfully!");
} else {
    console.log(doc.startupconsole);
};

bot.on('ready', function(event) {
    if (doc.startupevent === "") {
        bot.sendMessage({
            to: doc.logchannel,
            message: "Logged in as " + bot.username + " (who has ID " + bot.id + ")"
        });
    } else {
        bot.sendMessage({
            to: doc.logchannel,
            message: doc.startupconsole
        });
    }
});

bot.on('message', function(user, userID, channelID, message, event) {
  try{
    mainplugin.main(bot, doc, user, userID, channelID, message, event);
    repeatplugin.repeat(bot, doc, user, userID, channelID, message, event);
    versionplugin.version(bot, doc, user, userID, channelID, message, event);
  } catch (error){
    console.log(error);
  }
});
