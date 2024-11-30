const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons');

module.exports = {
	name: 'logs',
	aliases: [],
	run: async (client, message, args, prefix, color) => {

		function updateembed(msg) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`Configuration Logs`)
				.setColor(color)
				.setFooter(`${client.config.name}`)
				.setTimestamp()
				.addField("Logs Mods", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ? `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})` : ":x:")
				.addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ? `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})` : ":x:")
				.addField("Logs Vocal", message.guild.channels.cache.get(db.get(`logvc_${message.guild.id}`)) ? `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})` : ":x:")



			let menuoptions = [{
					value: "Modifier le salon de Logs Mods",
					description: "Permet de choisir le salon des Logs Mods",
					emoji: "🏷️"
				},
				{
					value: "Supprimer le salon de Logs Mods",
					description: "Permet de supprimer le salon des Logs Mods",
					emoji: "🛎️"
				},
				{
					value: "Modifier le salon de Logs Message",
					description: "Permet de choisir le salon des Logs message",
					emoji: "📩"
				},
				{
					value: "Supprimer le salon de Logs Message",
					description: "Permet de supprimer le salon des Logs Message",
					emoji: "✉️"
				},
				{
					value: "Modifier le salon de Logs Vocal",
					description: "Permet de choisir le salon des Logs Vocal",
					emoji: "🎧"
				},
				{
					value: "Supprimer le salon de Logs Vocal",
					description: "Permet de supprimer le salon des Logs Vocal",
					emoji: "🔊"
				},


			]




			let interactiveButtons = new MessageMenu()
				.setID(message.id + 'MenuSelection')
				.setMaxValues(1)
				.setMinValues(1)
				.setPlaceholder('Fais un choix');
			menuoptions.forEach(option => {
				let row = new MessageMenuOption()
					.setLabel(option.label ? option.label : option.value)
					.setValue(option.value)
					.setDescription(option.description)
					.setDefault()
				if (option.emoji) row.setEmoji(option.emoji)
				interactiveButtons.addOption(row)
			})
			const bt2 = new MessageButton()
				.setStyle("gray")
				.setID("logs" + message.id)
				.setEmoji("❌")
				.setLabel("Reformuler votre choix")
			msg.edit({
				embed: embed,
				components: [

					{
						type: 1,
						components: [interactiveButtons]
					},

					{
						type: 1,
						components: [bt2],
					}
				]
			})
		}
		let perm = ""
		message.member.roles.cache.forEach(role => {
			if (db.get(`ownerp_${message.guild.id}_${role.id}`)) perm = true
		})
		if (client.config.owner.includes(message.author.id) || db.get(`ownermd_${client.user.id}_${message.author.id}`) === true || perm) {
			const embed = new Discord.MessageEmbed()
				.setTitle(`Configuration Logs`)
				.setColor(color)
				.setFooter(`${client.config.name}`)
				.setTimestamp()
				.addField("Logs Mods", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ? `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})` : ":x:")
				.addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ? `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})` : ":x:")
				.addField("Logs Vocal", message.guild.channels.cache.get(db.get(`logvc_${message.guild.id}`)) ? `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})` : ":x:")



			let menuoptions = [{
					value: "Modifier le salon de Logs Mods",
					description: "Permet de choisir le salon des Logs Mods",
					emoji: "🏷️"
				},
				{
					value: "Supprimer le salon de Logs Mods",
					description: "Permet de supprimer le salon des Logs Mods",
					emoji: "🛎️"
				},
				{
					value: "Modifier le salon de Logs Message",
					description: "Permet de choisir le salon des Logs Message",
					emoji: "📩"
				},
				{
					value: "Supprimer le salon de Logs Message",
					description: "Permet de supprimer le salon des Logs Message",
					emoji: "✉️"
				},
				{
					value: "Modifier le salon de Logs Vocal",
					description: "Permet de choisir le salon des Logs Vocal",
					emoji: "🎧"
				},
				{
					value: "Supprimer le salon de Logs Vocal",
					description: "Permet de supprimer le salon des Logs Vocal",
					emoji: "🔊"
				},


			]

			let interactiveButtons = new MessageMenu()
				.setID(message.id + 'MenuSelection')
				.setMaxValues(1)
				.setMinValues(1)
				.setPlaceholder('Fais un choix');
			menuoptions.forEach(option => {
				let row = new MessageMenuOption()
					.setLabel(option.label ? option.label : option.value)
					.setValue(option.value)
					.setDescription(option.description)
					.setDefault()
				if (option.emoji) row.setEmoji(option.emoji)
				interactiveButtons.addOption(row)
			})
			const bt2 = new MessageButton()
				.setStyle("gray")
				.setID("logs" + message.id)
				.setEmoji("❌")
				.setLabel("Reformuler votre choix")
			message.channel.send({
				embed: embed,
				components: [

					{
						type: 1,
						components: [interactiveButtons]
					},

					{
						type: 1,
						components: [bt2],
					}
				]
			}).then(async m => {
				setTimeout(() => {
					m.edit("", {
						components: [],
						embed: new Discord.MessageEmbed()
							.setTitle(`Configuration Logs`)
							.setColor(color)
							.setFooter(`${client.config.name}`)
							.setTimestamp()
							.addField("Logs Mods", message.guild.channels.cache.get(db.get(`logmod_${message.guild.id}`)) ? `<#${db.get(`logmod_${message.guild.id}`)}> (${db.get(`logmod_${message.guild.id}`)})` : ":x:")
							.addField("Logs Message", message.guild.channels.cache.get(db.get(`msglog_${message.guild.id}`)) ? `<#${db.get(`msglog_${message.guild.id}`)}> (${db.get(`msglog_${message.guild.id}`)})` : ":x:")
							.addField("Logs Vocal", message.guild.channels.cache.get(db.get(`logvc_${message.guild.id}`)) ? `<#${db.get(`logvc_${message.guild.id}`)}> (${db.get(`logvc_${message.guild.id}`)})` : ":x:")
					})
					// message.channel.send(embeds)
				}, 60000 * 5)
				client.on('clickMenu', async (menu) => {
					if (message.author !== menu.clicker.user || menu.message.id !== m.id) return;
					menu.reply.defer(true)
					menuselection(menu)
				})
				client.on('clickButton', async (button) => {
					if (message.author !== button.clicker.user) return;

					if (button.id === "logs" + message.id) {
						button.reply.defer(true)
						updateembed(m)
					}
				})

				function menuselection(menu) {
					switch (menu.values[0]) {
						case "Modifier le salon de Logs Mods":
							message.channel.send(`Quel est **le nouveau salon de Logs Mods** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();
										var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
										if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

										db.set(`logmod_${message.guild.id}`, role.id)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})
							break
						case "Supprimer le salon de Logs Mods":
							db.delete(`logmod_${message.guild.id}`)
							updateembed(m)
							break

						case "Modifier le salon de Logs Message":
							message.channel.send(`Quel est **le nouveau salon de Logs Message** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();
										var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
										if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

										db.set(`msglog_${message.guild.id}`, role.id)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})
							break
						case "Supprimer le salon de Logs Message":
							db.delete(`msglog_${message.guild.id}`)
							updateembed(m)
							break

						case "Modifier le salon de Logs Vocal":
							message.channel.send(`Quel est **le nouveau salon de Logs Vocal** ?`).then(mp => {
								mp.channel.awaitMessages(response => {
										return response.author.id === message.author.id
									}, {
										max: 1,
										time: 60000,
										errors: ['time']
									})
									.then(cld => {

										var msg = cld.first();
										var role = message.guild.channels.cache.get(msg.content) || msg.mentions.channels.first()
										if (!role) return message.channel.send(`Aucun salon trouvé pour \`${msg.content}\`.`);

										db.set(`logvc_${message.guild.id}`, role.id)
										mp.delete()
										cld.first().delete()
										updateembed(m)

									});
							})
							break
						case "Supprimer le salon de Logs Vocal":
							db.delete(`logvc_${message.guild.id}`)
							updateembed(m)
							break
					}
				}
			})

		}

	}
}
