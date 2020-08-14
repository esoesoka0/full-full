  
const Discord = require("discord.js");



var prefix = "s=";


const client = new Discord.Client();
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
 client.user.setActivity("s=help",{type: 'watching'})
  console.log('')
  console.log('')
  console.log('╔[═════════════════════════════════════════════════════════════════]╗')
  console.log(`[Start] ${new Date()}`);
  console.log('╚[═════════════════════════════════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════════════════════════════]╗');
  console.log(`Logged in as * [ " ${client.user.username} " ]`);
  console.log('')
  console.log('Informations :')
  console.log('')
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);
  console.log('╚[════════════════════════════════════]╝')
  console.log('')
  console.log('╔[════════════]╗')
  console.log(' Bot Is Online')
  console.log('╚[════════════]╝')
  console.log('')
  console.log('')
});

const fs = require("fs");
const anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8")); // create antigreff.json file with {} inside it
const config = JSON.parse(fs.readFileSync("./config.json", "UTF8")); // create config.json file with

client.on("message", message => {
  if (!message.channel.guild) return;
  let user = anti[message.guild.id + message.author.id];
  let num = message.content
    .split(" ")
    .slice(2)
    .join(" ");
  if (!anti[message.guild.id + message.author.id])
    anti[message.guild.id + message.author.id] = {
      actions: 0
    };
  if (!config[message.guild.id])
    config[message.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3,
      time: 30
    };
  if (message.content.startsWith(prefix + "settings")) {
    if (!message.member.hasPermission("Ownership")) return;

    if (message.content.startsWith(prefix + "settings ban")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command !  **"
        );
      config[message.guild.id].banLimit = num;
      message.channel.send(
        `**⇏ | Changed To : ${config[message.guild.id].banLimit} **`
      );
    }
    if (message.content.startsWith(prefix + "settings kick")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      config[message.guild.id].kickLimits = num;
      message.channel.send(
        `**⇏ | Changed To: ${config[message.guild.id].kickLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings roleD")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      config[message.guild.id].roleDelLimit = num;
      message.channel.send(
        `**⇏ | Changed To : ${config[message.guild.id].roleDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings roleC")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      config[message.guild.id].roleCrLimits = num;
      message.channel.send(
        `**⇏ | Changed To : ${config[message.guild.id].roleCrLimits}**`
      );
    }
    if (message.content.startsWith(prefix + "settings channelD")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      config[message.guild.id].chaDelLimit = num;
      message.channel.send(
        `**⇏ | Changed To : ${config[message.guild.id].chaDelLimit}**`
      );
    }
    if (message.content.startsWith(prefix + "settings time")) {
      if (!num)
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      if (isNaN(num))
        return message.channel.send(
          "**⇏ | Type numbers after the command ! **"
        );
      config[message.guild.id].time = num;
      message.channel.send(
        `**⇏ | Changed To: ${config[message.guild.id].time}**`
      );
    }
    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
});
client.on("channelDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "CHANNEL_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].chaDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} tried to delete many channels**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("roleDelete", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_DELETE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleDelLimit
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} tried to delete many roles **`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("roleCreate", async channel => {
  const entry1 = await channel.guild
    .fetchAuditLogs({
      type: "ROLE_CREATE"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[channel.guild.id])
    config[channel.guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[channel.guild.id + entry.id]) {
    anti[channel.guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
  } else {
    anti[channel.guild.id + entry.id].actions = Math.floor(
      anti[channel.guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[channel.guild.id + entry.id].actions = "0";
    }, config[channel.guild.id].time * 1000);
    if (
      anti[channel.guild.id + entry.id].actions >=
      config[channel.guild.id].roleCrLimits
    ) {
      channel.guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          channel.guild.owner.send(
            `**⇏ | ${entry.username} tried to create many roles**`
          )
        );
      anti[channel.guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildBanAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_BAN_ADD"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `**⇏ | ${entry.username} Tried to ban all memebers **`
          )
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildKickAdd", async (guild, user) => {
  const entry1 = await guild
    .fetchAuditLogs({
      type: "MEMBER_KICK"
    })
    .then(audit => audit.entries.first());
  console.log(entry1.executor.username);
  const entry = entry1.executor;
  if (!config[guild.id])
    config[guild.id] = {
      banLimit: 3,
      chaDelLimit: 3,
      roleDelLimit: 3,
      kickLimits: 3,
      roleCrLimits: 3
    };
  if (!anti[guild.id + entry.id]) {
    anti[guild.id + entry.id] = {
      actions: 1
    };
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
  } else {
    anti[guild.id + entry.id].actions = Math.floor(
      anti[guild.id + entry.id].actions + 1
    );
    console.log("TETS");
    setTimeout(() => {
      anti[guild.id + entry.id].actions = "0";
    }, config[guild.id].time * 1000);
    if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
      guild.members
        .get(entry.id)
        .ban()
        .catch(e =>
          guild.owner.send(
            `**⇏ | ${entry.username} tried to ban all memebers **`
          )
        );
      anti[guild.id + entry.id].actions = "0";
      fs.writeFile("./config.json", JSON.stringify(config), function(e) {
        if (e) throw e;
      });
      fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
        if (e) throw e;
      });
    }
  }

  fs.writeFile("./config.json", JSON.stringify(config), function(e) {
    if (e) throw e;
  });
  fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
    if (e) throw e;
  });
});

client.on("guildMemberRemove", async member => {
  const entry1 = await member.guild
    .fetchAuditLogs()
    .then(audit => audit.entries.first());
  if (entry1.action === "MEMBER_KICK") {
    const entry2 = await member.guild
      .fetchAuditLogs({
        type: "MEMBER_KICK"
      })
      .then(audit => audit.entries.first());
    const entry = entry2.executor;
    if (!config[member.id])
      config[member.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
      };
    if (!anti[member.guild.id + entry.id]) {
      anti[member.guild.id + entry.id] = {
        actions: 1
      };
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
    } else {
      anti[member.guild.id + entry.id].actions = Math.floor(
        anti[member.guild.id + entry.id].actions + 1
      );
      console.log("TETS");
      setTimeout(() => {
        anti[member.guild.id + entry.id].actions = "0";
      }, config[member.guild.id].time * 1000);
      if (
        anti[member.guild.id + entry.id].actions >=
        config[member.guild.id].kickLimits
      ) {
        member.guild.members
          .get(entry.id)
          .ban()
          .catch(e =>
            member.owner.send(
              `**⇏ | ${entry.username} tried to ban all memebers **`
            )
          );
        anti[member.guild.id + entry.id].actions = "0";
        fs.writeFile("./config.json", JSON.stringify(config), function(e) {
          if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
          if (e) throw e;
        });
      }
    }

    fs.writeFile("./config.json", JSON.stringify(config), function(e) {
      if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti), function(e) {
      if (e) throw e;
    });
  }
});
 client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`servers! [ " ${client.guilds.size} " ]`);
  console.log(`Users! [ " ${client.users.size} " ]`);
  console.log(`channels! [ " ${client.channels.size} " ]`);

client.user.setActivity("s=help", {type: 'WATCHING'})
   
//////////////help////////////
   
});
  client.on("message", async message => {
if (message.content.startsWith(prefix + "help")) {
	const embed = new Discord.RichEmbed()
	.setColor(669900)
	.setTitle("**__SecurityBot Commandes__**")
	.addField("🔸***s=security***", "🔰*For Protection*")
	.addField("🔹***s=invite***",   "📥*for invite our bot*")
	.addField("🔸***s=bot***",   "🤖*some info about the bot*")
	.addField("🔹***s=lock***",  "🔐*for close the channel*")
	.addField("🔸***s=unlock***","🔓*for open the channel*")
        .addField("🔸***s=server***","❗️*some info about the server*")
        message.channel.send(embed);
	
  
   }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "banslist")) {
        if(!message.guild) return;
                if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**Sorry But You Dont Have Permission** `BAN_MEMBERS`' );
        message.guild.fetchBans()
        .then(bans => {
            let b = bans.size;
            let bb = bans.map(a => `${a}`).join(" - ");
            message.channel.send(`**\`${b}\` | ${bb}**`);
        });
    }
});
///////////////////////security///////////////////

client.on("message", async message => {
  if (message.content.startsWith(prefix + "security")) {
    /// امر القائمه
    let help = new Discord.RichEmbed()
      .setColor("#3d3b3b")
      .setThumbnail(message.author.avatarURL).setDescription(`**
                    
((HELP MENU FOR SECURITY))
${prefix}settings kick <number>
${prefix}settings ban <number>
${prefix}settings roleD <number>
${prefix}settings roleC <number>
${prefix}settings channelD <number>
${prefix}antibot on
${prefix}antibot off
${prefix}settings time <number>
**`);
    message.channel.sendEmbed(help);
  }
});
client.on('message',async message => {
  if(message.content === 's=unbanall') {
    var user = message.mentions.users.first();
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('❌|**\`ADMINISTRATOR\'You have no validity**');
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
    const guild = message.guild;

  message.guild.fetchBans().then(ba => {
  ba.forEach(ns => {
  message.guild.unban(ns);
  const embed= new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor("Succes!", "https://images-ext-1.discordapp.net/external/vp2vj9m0ieU5J6SHg6ObIsGpTJyoZnGAebrd0_vi848/https/i.imgur.com/GnR2unD.png?width=455&height=455")
        .setDescription(`**:white_check_mark: Has Been Unban For All**`)
    .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  message.channel.sendEmbed(embed);
  guild.owner.send(`Server : ${guild.name}
  **The band has been removed from everyone by** : <@${message.author.id}>`) 
  });
  });
  }
  });

const db = require("quick.db"); // npm i quick.db

client.on("message", async message => {
  const prefix = "s="; //comand

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let antibot = await db.fetch(`antibot_${message.guild.id}`);
  if (antibot === null) antibot = "off";

  if (cmd === "antibot") {
    if (!message.guild.member(message.author).hasPermission("Owner"))
      return message.reply(`Only OWNER can use this command`);
    if (!args[0])
      return message.reply(
        `___***دەتەوێت بۆت بێتە ژوروە یان نەیەت؟***___ \`off / on\``
      );

    if (args[0] === "on") {
      db.set(`antibot_${message.guild.id}`, "on");
      message.reply(`***Antibot is on***`).RichEmbed();
    }

    if (args[0] === "off") {
      db.set(`antibot_${message.guild.id}`, "off");
      message.reply(`***Antibot is off***`).RichEmbed();
    }
  }
});
client.on("guildMemberAdd", async member => {
  let antibot = await db.fetch(`antibot_${member.guild.id}`);
  if (antibot === "on") {
    if (member.user.bot) member.kick("Anti bot is on !");
  }
});

client.on("message", message => {
  if (message.content == prefix + "bot") {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .setColor("#8A0808")
        .setTitle("``INFO Bot`` ")
        .addField(
          "``My Ping``",
          [`${Date.now() - message.createdTimestamp}` + "MS"],
          true
        )
        .addField(
          "``RAM Usage``",
          `[${(process.memoryUsage().rss / 1048576).toFixed()}MB]`,
          true
        )
        .addField("``servers``", [client.guilds.size], true)
        .addField("``channels``", `[ ${client.channels.size} ]`, true)
        .addField("``Users``", `[ ${client.users.size} ]`, true)
        .addField("``My Name``", `[ ${client.user.tag} ]`, true)
        .addField("``My Prefix``", `[ = ]`, true)
        .addField("``My Language``", `[ Java Script ]`, true)
        .setFooter(
          "@Robot.𝐄𝐒𝐎⁹⁹#1136",
          "https://cdn.discordapp.com/attachments/672983680733413397/741239248749068368/image0.png"
       )
    });
  }
});

 client.on("message", message => {
  if (message.content.startsWith(prefix + "invite")) {
    var mentionned = message.mentions.users.first();
    var x5bzm;
    if (mentionned) {
      var x5bzm = mentionned;
    } else {
      var x5bzm = message.author;
    }
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`__بۆ ئینڤایت کردنی بۆتەکە بۆ سێرڤەرەکەت کلیک بکە__
     **[کلیک بکە](https://discord.com/api/oauth2/authorize?client_id=735460729653821462&permissions=8&scope=bot)**`)
     
    
    message.channel.sendEmbed(embed);
  }
});

client.on("message", function(msg) {
  const prefix = "s=";
  if (msg.content == prefix + "server") {
    let embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`زانیاری سێرڤەری  **${msg.guild.name}**`)
      .addField(
      "🌐** کیشوەری سـێـرڤـەر**",
        `[** __${msg.guild.region}__ **]`,
        true
      )
      .addField("🔸** __ڕۆڵەکان__**", `[** __${msg.guild.roles.size}__ **]`, true)
      .addField(
        "👥**__ هەمو مێمبەرەکان__**",
        `[** __${msg.guild.memberCount}__ **]`,
        true
      )
      .addField(
        "🟢**__ ئەو کەسانەی ئۆنڵاین__**",
        `[** __${
          msg.guild.members.filter(m => m.presence.status == "online").size
        }__ **]`,
        true
      )
      .addField(
        "📝**__ رومی چاتی__**",
        `[** __${msg.guild.channels.filter(m => m.type === "text").size}__** ]`,
        true
      )
      .addField(
        "🎤**__ رۆمی دەنگی __**",
        `[** __${
          msg.guild.channels.filter(m => m.type === "voice").size
        }__ **]`,
        true
      )
      .addField("👑**__ ئـاونـەر __**", `**${msg.guild.owner}**`, true)
      .addField("🆔**__ ئایدی سێرڤەر__**", `**${msg.guild.id}**`, true)
      .addField(
        "📅**__  کاتی دانانی سێرڤەر  __**",
        msg.guild.createdAt.toLocaleString()
      );
    msg.channel.send({ embed: embed });
  }
});

client.on("message", message => {
  if (message.content === prefix + "lock") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply(" **__تۆ ئەو ھێزەت نيە__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      })
      .then(() => {
        message.reply("**__چات داخرا__ :white_check_mark: **");
      });
  }
  if (message.content === prefix + "unlock") {
    if (!message.channel.guild)
      return message.reply("** This command only for servers**");

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.reply("**__تۆ ئەو ھێزەت نيە__**");
    message.channel
      .overwritePermissions(message.guild.id, {
        SEND_MESSAGES: true
      })
      .then(() => {
        message.reply("**__چاتكرايەوە__:white_check_mark:**");
   });
  }
});
client.on("ready", () => {
  console.log(
    `Online In Servers : ${client.guilds.size} | Users : ${client.users.size}`
  );
  let statuses = [
    `Servers: ${client.guilds.size} | Users: ${client.users.size}`,
    `s=help | KURDISH UP`,
    `SECURITY FOR DISCORD`
  ];
  setInterval(function() {
    let STREAMING = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(STREAMING, {
      type: "PLAYING",
      url: "https://www.twitch.tv/faith"
    });
  }, 3000);
});

client.login("NzM1NDYwNzI5NjUzODIxNDYy.XxglLg.VazvhrNdYRiOnjjyl7k-ZRBNlSk");