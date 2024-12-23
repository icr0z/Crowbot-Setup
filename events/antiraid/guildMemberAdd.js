const axios = require('axios');
const db = require("quick.db")
const {
	MessageEmbed
} = require("discord.js");
const ms = require("ms")
const Discord = require("discord.js")

module.exports = async (client, member) => {
	const guild = member.guild
	const raidlog = guild.channels.cache.get(db.get(`${guild.id}.raidlog`))
	const color = db.get(`color_${guild.id}`) === null ? client.config.color : db.get(`color_${guild.id}`)

	if (db.get(`crealimit_${member.guild.id}`) === true) {
		const duration = ms(db.get(`crealimittemps_${member.guild.id}`) || "0s");
		let created = member.user.createdTimestamp;
		let sum = created + duration;
		let diff = Date.now() - sum;

		if (diff < 0) {

			member.kick()
		}
		const embed = new Discord.MessageEmbed()
			.setColor(color)
			.setDescription(`${member} à été **kick** parce que \`son compte à été crée trop récemment\``)
		if (raidlog) raidlog.send(embed)
	}

	if (db.get(`blmd_${client.user.id}_${member.id}`) === true) {
		member.ban().then(() => {
			if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`${member} a rejoint alors qu'il êtait blacklist, il a été **ban**`))

		}).catch(() => {
			if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`${member} a rejoint alors qu'il êtait blacklist, mais il n'a pas pu être **ban**`))

		})
	}

	if (member.user.bot) {
		const action = await guild.fetchAuditLogs({
			limit: 1,
			type: "BOT_ADD"
		}).then(async (audit) => audit.entries.first())
		if (action.executor.id) {
			let perm = ""
			if (db.get(`botwl_${guild.id}`) === null) perm = client.user.id === action.executor.id || guild.owner.id === action.executor.id || client.config.owner.includes(action.executor.id) || db.get(`ownermd_${client.user.id}_${action.executor.id}`) === true || db.get(`wlmd_${guild.id}_${action.executor.id}`) === true
			if (db.get(`botwl_${guild.id}`) === true) perm = client.user.id === action.executor.id || guild.owner.id === action.executor.id || client.config.owner.includes(action.executor.id) || db.get(`ownermd_${client.user.id}_${action.executor.id}`) === true
			if (db.get(`bot_${guild.id}`) === true && !perm) {
				if (db.get(`botsanction_${guild.id}`) === "ban") {
					axios({
						url: `https://discord.com/api/v9/guilds/${guild.id}/bans/${action.executor.id}`,
						method: 'PUT',
						headers: {
							Authorization: `bot ${process.env.token}`
						},
						data: {
							delete_message_days: '1',
							reason: 'Antiban'
						}
					}).then(() => {

						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, il a été **ban** !`))
					}).catch(() => {

						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, mais il n'a pas pu être **ban** !`))

					})
				} else if (db.get(`botsanction_${guild.id}`) === "kick") {
					guild.users.cache.get(action.executor.id).kick().then(() => {

						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, il a été **kick** !`))
					}).catch(() => {

						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, mais il n'a pas pu être **kick** !`))
					})
				} else if (db.get(`botsanction_${guild.id}`) === "derank") {

					guild.users.cache.get(action.executor.id).roles.set([]).then(() => {


						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, il a été **derank** !`))
					}).catch(() => {

						if (raidlog) return raidlog.send(new MessageEmbed().setColor(color).setDescription(`<@${action.executor.id}> a invité le bot ${member}, mais il n'a pas pu être **derank** !`))
					})
				}
			}
		}
	}
}
