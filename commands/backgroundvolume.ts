import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { bot } from "../index";
import { i18n } from "../utils/i18n";
import { safeReply } from "../utils/safeReply";

export default {
  data: new SlashCommandBuilder()
  .setName("backgroundvolume")
  .setDescription(i18n.__("backgroundvolume.description"))
  .addIntegerOption((option) =>
    option.setName("number").setDescription(i18n.__("backgroundvolume.args.description")).setRequired(true)
  ),
  execute(interaction: ChatInputCommandInteraction) {
    bot.BackgroundVolume = interaction.options.getInteger("number") ?? bot.BackgroundVolume;
    const queue = bot.queues.get(interaction.guild!.id);
    if(queue){
      if(queue.isBackgrounded()){
        queue.resource.volume?.setVolumeLogarithmic(bot.BackgroundVolume/100)
      }
    }
    safeReply(interaction, i18n.__mf(`Background volume set to ${bot.BackgroundVolume}`, { author: interaction.user.id }));
  }
};

