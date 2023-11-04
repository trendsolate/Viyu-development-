const Discord = require('discord.js')
const { SlashCommandBuilder, EmbedBuilder, ChannelType, IntentsBitsField, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, MessageAttachment, Client, Collection, Events, GatewayIntentBits, time, guilds, AuditLogEvent } = require('discord.js');
let client = new Discord.Client({ intents: ["Guilds", "GuildMessages", "MessageContent", "GuildMembers", "GuildMessageReactions", "DirectMessages", "GuildPresences", "GuildBans", "GuildVoiceStates"], partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction, Discord.Partials.Channel, Discord.Partials.GuildMember] })

const express = require("express");
const app = express();

const path = require('path')
const axios = require("axios")
const fs = require('fs')
const colors = require('colors')


const { MongoClient } = require('mongodb');
const mclient = new MongoClient("");
const db = mclient.db("viyu");
const collection = db.collection('viyu');
try {
  mclient.connect().then(() => console.log(`${"[✔️]".green} Connected to database successfully.`))

} catch (e) {
  console.error(e);
}

//launching slash commands

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
  }
}

require("./deploy-commands.js")

app.listen(3001, () => {
  console.log("Loading...");
})

app.get("/", function(req, res) {
  res.send("hi")
})
