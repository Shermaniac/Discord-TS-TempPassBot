import { TeamSpeak, QueryProtocol } from "ts3-nodejs-library";
import { REST, Routes } from 'discord.js';
import { Client, GatewayIntentBits } from 'discord.js';
require('dotenv').config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.D_DISCORD_TOKEN;
const CLIENT_ID = process.env.D_CLIENT_ID;

const commands = [
  {
    name: 'generate-temporary-password',
    description: 'Generates a random temporary password on the TeamSpeak Server.',
  },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const teamspeak = new TeamSpeak({
  host: process.env.TS_SERVER_ADDRESS || '127.0.0.1',
  protocol: QueryProtocol.RAW,
  serverport: process.env.TS_SERVER_PORT || 9987,
  username: process.env.TS_USERNAME,
  password: process.env.TS_PASSWORD,
  nickname: process.env.TS_NICKNAME || "TP Bot",
  queryport: process.env.TS_SERVER_QUERY_PORT || 10011
});

const characters = process.env.PASSWORD_CHARACTERS;

function generateString(length) {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

teamspeak.on("ready", async () => {
  console.log("connected");
  const whoami = await teamspeak.whoami();
  console.log(whoami);
  // teamspeak.serverTempPasswordAdd({"pw": `${generateString(7)}`, "duration": "300"});
});

teamspeak.on("error", () => {
  console.log("TS3 encountered an unknown error. Check your .env and make sure all files are setup properly.");
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (process.env.D_ENFORCE_ROLES === 'Yes') {
    const allowedRoleId = process.env.D_ALLOWED_ROLE_ID;
    const userHasRole = interaction.member.roles.cache.has(allowedRoleId);

    if (!userHasRole) {
      return interaction.reply({
        content: 'You do not have the required role to use this command. Required role ID: ' + process.env.D_ALLOWED_ROLE_ID,
        ephemeral: true,
      });
    }
  }

  if (interaction.commandName === 'generate-temporary-password') {
    const generatedPass = generateString(process.env.PASSWORD_LENGTH);
    teamspeak.serverTempPasswordAdd({"pw": `${generatedPass}`, "duration": process.env.PASSWORD_DURATION});
    console.log(`Successfully generated password and added it to the database. Password: ${generatedPass}`);
    interaction.reply(`I've generated a temporary password that will expire in ` + process.env.PASSWORD_DURATION + ` seconds. Password: ${generatedPass}`);
  }
});

client.login(TOKEN);