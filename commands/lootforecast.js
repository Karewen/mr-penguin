const Discord = require(`discord.js`)

const fetch = require('node-fetch');

module.exports = {
	name: 'lootforecast',
	aliases: ['lf'],
  	cooldown: 0.5,
	description: 'Loot status.',
	execute(message, args) {

     let client = message.client;

     let owner = client.users.cache.get('712329796931158016');
    
     fetch('http://clashofclansforecaster.com/STATS.json')
     .then(result => result.json())
     .then(async json => {
       
       let forecastWordNow = json.forecastWordNow;
       
       let forecastMessage = json.forecastMessages['english'];
       
       let mainColorShadeNow = json.mainColorShadeNow;
       
       let embed = new Discord.MessageEmbed()
       .setTitle(`Loot Forecaster`)
       .setColor(mainColorShadeNow)
       .addField(`Loot availability:`, forecastWordNow)
       .addField(`Farmer's Forcast:`, forecastMessage)
       .addField(`Credits to:`, "[Clash of Clans Forecaster](http://clashofclansforecaster.com/)")
       .setFooter(`Bot owner: ${owner.tag}`, owner.displayAvatarURL())
       
       message.channel.send(embed)
       
     })
     .then(err => {
       if(err){
         return console.log(err)
       }
     });
    
  },
}
