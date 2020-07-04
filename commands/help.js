const Discord = require(`discord.js`)

const { stripIndents } = require("common-tags");

module.exports = {
	name: 'help',
	aliases: ['h'],
  	cooldown: 0.5,
	description: 'Displays information about the bot.',
	execute(message, args) {

     let client = message.client;

     let owner = client.users.cache.get('712329796931158016');
       
       let embed = new Discord.MessageEmbed()
       .setTitle(`Help Embed`)
       .setColor("RANDOM")
       .addField("FAQs", stripIndents`**How does the bot work?**
       This bot forecasts the relative amounts and numbers of unharvested mines and collectors in Supercell's Clash of Clans. It simulates players habits around the world to provide an overall view of the quality of raids you can expect to find in the game. Use the command  ` + "`~lf` or `~lootforecast` " + ` to help coordinate your raids so that you make sure you're taking advantage of the best times to be raiding. For example, if you're planning on boosting your barracks in order to do some farming, make sure you boost when the game is entering a good or great period to be raiding rather than a time when raiding is poor.`)
       .addField(`Credits to:`, "[Clash of Clans Forecaster](http://clashofclansforecaster.com/)")
       .setFooter(`Bot creator: ${owner.tag}`, owner.displayAvatarURL())
       
       message.channel.send(embed)
    
  },
}
