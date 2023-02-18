const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Select a member and ban them.')
		.addStringOption(option =>
			option
				.setName('text')
				.setDescription('The reason for banning')
                .setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
        async execute(interaction) {
            const text = interaction.options.getString('text') ?? 'No text detected';
            await interaction.reply(text);
        },
};