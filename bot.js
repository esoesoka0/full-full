


var prefix = "=";
var prefix = "s=";


const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("a!help",{type: 'watching'})
 client.user.setActivity("s=help",{type: 'watching'})
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
@@ -518,7 +518,7 @@ client.on("guildMemberRemove", async member => {
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);

client.user.setActivity("=help", {type: 'WATCHING'})
client.user.setActivity("s=help", {type: 'WATCHING'})

//////////////help////////////

@@ -528,12 +528,12 @@ if (message.content.startsWith(prefix + "help")) {
	const embed = new Discord.RichEmbed()
	.setColor(669900)
	.setTitle("**__SecurityBot Commandes__**")
	.addField("🔸***=security***", "🔰*For Protection*")
	.addField("🔹***=invite***",   "📥*for invite our bot*")
	.addField("🔸***=bot***",   "🤖*some info about the bot*")
	.addField("🔹***=lock***",  "🔐*for close the channel*")
	.addField("🔸***=unlock***","🔓*for open the channel*")
        .addField("🔸***=server***","❗️*some info about the server*")
	.addField("🔸***s=security***", "🔰*For Protection*")
	.addField("🔹***s=invite***",   "📥*for invite our bot*")
	.addField("🔸***s=bot***",   "🤖*some info about the bot*")
	.addField("🔹***s=lock***",  "🔐*for close the channel*")
	.addField("🔸***s=unlock***","🔓*for open the channel*")
        .addField("🔸***s=server***","❗️*some info about the server*")
        message.channel.send(embed);


@@ -576,7 +576,7 @@ ${prefix}settings time <number>
  }
});
client.on('message',async message => {
  if(message.content === '=unbanall') {
  if(message.content === 's=unbanall') {
    var user = message.mentions.users.first();
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\'You have no validity**');
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
@@ -601,7 +601,7 @@ client.on('message',async message => {
const db = require("quick.db"); // npm i quick.db

client.on("message", async message => {
  const prefix = "="; //comand
  const prefix = "s="; //comand

  if (message.author.bot) return;
  if (!message.guild) return;
@@ -694,7 +694,7 @@ client.on("message", message => {
});

client.on("message", function(msg) {
  const prefix = "=";
  const prefix = "s=";
  if (msg.content == prefix + "server") {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
@@ -776,7 +776,7 @@ client.on("ready", () => {
  );
  let statuses = [
    `Servers: ${client.guilds.size} | Users: ${client.users.size}`,
    `=help | KURDISH UP`,
    `s=help | KURDISH UP`,
    `SECURITY FOR DISCORD`
  ];
  setInterval(function() {
