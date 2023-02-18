// Require the necessary discord.js and node.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const Discord = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Discord.Collection();


//I'm gunna forget what this does in 2 days so here's the link: https://discordjs.guide/creating-your-bot/command-handling.html#loading-command-files
const eventsPath = path.join(__dirname, 'events');
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) 
{
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {client.commands.set(command.data.name, command);} 
    else 
    {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

for (const file of eventFiles) 
{
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {client.once(event.name, (...args) => event.execute(...args));} 
    else{client.on(event.name, (...args) => event.execute(...args));}
}

// Log in to Discord with your client's token
client.login(token);