
const Discord = require("discord.js");
const client = new Discord.Client();

//Winky Config
var wcfg = {
	prefix: "^",
	maxArgs: 1
};
//Declarations
var intCommand;

//PUT COMMANDS HERE
//C is a wrapper function to avoid reusing function names. Plus C.xxx(arg1, arg2) looks way cooler and this part of the bot can be spread to other Discord.js bots.
var c = {
	ping: function() {
		pCmd.message.reply("Pong! :wink:")
	},
	coinflip: function() {
		if (Math.floor((Math.random() * 2) + 1) == 1) {
			pCmd.message.reply("Heads! Now gimme some tail! :wink:");
			return
		} else {
			pCmd.message.reply("Tails! Now gimme some head! :wink:")
		}
	},
	random: function() {
		if (!pCmd.arg[0]) { pCmd.message.reply("Command format: ^random [max integer]"); return; };
		pCmd.message.reply(Math.floor((Math.random() * pCmd.arg[0]) + 1) + "! :wink:")
	}
}


//the command interpreter
client.on('message', msg => {
  if (msg.content.substring(0, 1) === wcfg.prefix) {
		//Immediately split our command into an array.
		cmdArray = msg.content.substring(1, msg.content.length).split(" ");
		console.log("Got command from " + msg.author + " command was: " + cmdArray); //Useful for debugging.
		if (cmdArray[wcfg.maxArgs + 1]) {
			msg.reply('Too many args!');
			return;
		};

		//Pack all of our stuff into a pCmd object.
		pCmd = {
			cmd: cmdArray.shift(),
			author: msg.author,
			arg: cmdArray,
			message: msg
		}


    //switch statement pairing to the functions.
		switch (pCmd.cmd) {
			case "ping":
				c.ping();
				break;
			case "coinflip":
				c.coinflip();
				break;
			case "random":
				c.random();
				break;
			default:
				pCmd.message.reply("Unknown command! :wink:");
		};
  };
});

client.on('guildMemberAdd', member => {
  // Send the message to the guilds default channel (usually #general), mentioning the member
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome! Everyone say hi to ${member}!`);
});




//Other shit.
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
});


client.login('Mjg0NzE1MzA0NTgyMzgxNTY5.C6OaaQ.tpLXvSwXZWcciLxJs-IE3m1gzNU');
