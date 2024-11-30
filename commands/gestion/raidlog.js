const Discord = require('discord.js')
const db = require('quick.db')
const {
	MessageActionRow,
	MessageButton,
	MessageMenuOption,
	MessageMenu
} = require('discord-buttons')

module.exports = {
	name: 'raidlog',
	aliases: [],
	run: async (client, message, args, prefix, color) => {

		if (client.config.owner.includes(message.author.id)) {

			let ss = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
			if (args[0] === "on") {
				const channel = message.channel

				db.set(`${message.guild.id}.raidlog`, channel.id)
				message.channel.send(`Le salon ${channel} sera maintenant utilisé pour envoyer les Logs de Raid`)
			} else if (args[0] === "off") {
				db.set(`${message.guild.id}.raidlog`, null)
				message.channel.send(`Logs de raid désactivés`)

			} else
			if (ss) {
				db.set(`${message.guild.id}.raidlog`, ss.id)
				message.channel.send(`Le salon ${ss} sera maintenant utilisé pour envoyer les Logs de Raid`)
			}

		} else {

		}
	}
}
