const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const TOKEN = "(YOUR TOKEN)";

const command1 = "!";
 

function play(connection, message){
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function(){
        if(server.queue[0]) play(connection,message);
        else connection.disconnect();
    });
}

var fortune = [
    "Yes","No","Maybe"
];

var hd = [
    "Heads",
    "Tails"
];

var bot = new Discord.Client();

var servers = {};

bot.on("ready", function() {
    console.log("ready");
});

bot.on("guildMemberAdd", function(member){
    member.guild.channel.find("name","general").sendEmbed(member.toString() + "Welcome to League of Retards. \n A place to have fun playing League of Legends(and other games :D). \n Please read the rules at #rules.");
});

bot.on("message", async function(message){
    if(message.author.equals(bot.user)) return;

    if(!message.content.startsWith(command1)) return;

    var args = message.content.substring(command1.length).split(" ");

    switch (args[0].toLowerCase()){
        case "ask":
            if(args[1]) message.channel.sendMessage(fortune[Math.floor(Math.random() * fortune.length)]);
            else message.channel.sendMessage("Can't answer that.");
            break;
        case "askroledirtypervert":
            message.channel.sendMessage(message.author.toString() + " please ask <@185414206583996416> to access that role.")
            break;
        case "info":
            var embed = new Discord.RichEmbed()
                .addField("Nelyon", "Admin of LOR Server", true)
                .addField("Arzare", "Co Admin of LOR Server", true)
                .addField("SgtRyu", "Admin of LOR Bot", true)
                .setColor(0x000000FF);
            message.channel.sendEmbed(embed);
            break;
        case "rules":
                message.channel.sendMessage('Terms and Conditions for joining League of Retards:');
                message.channel.sendMessage('1. We play games like retards.');
                message.channel.sendMessage('2. Even though we\'re retarded, we\'re not toxic.');
                message.channel.sendMessage('3. You can be toxic, but don\'t go too far.');
                message.channel.sendMessage('4. Don\'t take things too seriously.');
                message.channel.sendMessage(message.author.toString() + ' Please read it and observe it.')
            break;
        case "roleinfo":
            var embed = new Discord.RichEmbed()
                .addField("ANCIENT ELDER RETARD", "1st Generation Member", true)
                .addField("NEW BLOOD RETARD", "2nd Generation Member", true)
                .setColor(0x00FFFF00);
            message.channel.sendEmbed(embed);
            break;
        case "play":
            if(!args[1]){
                message.channel.sendMessage("Please provide a link.");
                return;
            }

            if(!message.member.voiceChannel){
                message.channel.sendMessage("You must be in a voice channel.");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            };

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection){
                play(connection, message)});
            message.channel.sendMessage("Playing " + args[1]);
            break;
        case "queuelist":
            if(!args[1]){
                message.channel.sendMessage('There are no queue list. Please play a song for me :(.');
            }
            else{
                for(let i = 0 ; i < 100 ; i++){
                    message.channel.sendMessage(args[i]);
                }
            }
            break;
        case "skip":
                var server = servers[message.guild.id];

                if(server.dispatcher) server.dispatcher.end();
      
                message.channel.sendMessage('Song Skipped');
            break;
        case "stop":
                var server = servers[message.guild.id];

                if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                message.channel.sendMessage('Thank you for using LOR Bot by Ryusei "SgtRyu" Kasagawa');
            break;
        case "avatar":
                message.channel.sendMessage('Here\'s your avatar bud!');
                message.reply(message.author.avatarURL);
            break;e
        case "coin":
                message.channel.send(message.author.toString() + " You Flipped: " + (hd[Math.floor(Math.random() * hd.length)]));
            break;
        default:
                message.channel.sendMessage("Invalid Command");
    }
});

console.log('Bot is running!');
console.log('Enjoy the LoR Ryusei Senpai :)');



bot.login(process.env.BOT_TOKEN);
