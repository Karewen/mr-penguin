require('dotenv').config()

const Discord = require('discord.js');

const fetch = require('node-fetch');
const fs = require('fs');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.login(process.env.token);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('ready', () => {
    console.log(`I am ready and online as ${client.user.tag}`)
    client.user.setActivity(`~help on ${client.guilds.cache.size} servers.`, {type: "WATCHING"})
});

client.on("guildCreate", guild => {
   client.destroy()
   .then(() => client.login(process.env.token))
});

client.on("guildDelete", guild => {
    client.destroy()
   .then(() => client.login(process.env.token))
});

client.on('message', message => {
      let prefix = "~"
  
      if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return;
  
      const args = message.content.slice(prefix.length).split(/ +/);
      const commandName = args.shift().toLowerCase();
  
      const command = client.commands.get(commandName)
          || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
      if (!command) return;
  
      if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Discord.Collection());
      }
  
      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = (command.cooldown) * 60 * 1000;
  
      if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
          if (now < expirationTime) {
              const timeLeft = (expirationTime - now) / (60 * 1000);
              return message.reply(`please wait ${(timeLeft.toFixed(1))} minute(s) more before reusing the \`~${command.name}\` command.`);
          }
      }
  
      timestamps.set(message.author.id, now);
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount); 
  
      try {
          command.execute(message, args);
      } catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
      }
  });  


