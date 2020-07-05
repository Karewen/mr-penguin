const Discord = require(`discord.js`)

const { stripIndents } = require("common-tags");

module.exports = {
	name: 'invite',
  cooldown: 0.5,
	description: 'Invite the bot to your server.',
	execute(message, args) {

     let client = message.client;
       
       let embed = new Discord.MessageEmbed()
       .addField("Invite", `[Invite the bot to your server!](https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`);
       message.channel.send(embed)
    
  },
}
