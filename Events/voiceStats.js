const Discord = require("discord.js");
const Database = require("../Database/index");
const ses = new Database("Database", "Ses");

const Activites = new Map();

/**
 * @param {Discord.VoiceState} oldState
 * @param {Discord.VoiceState} newState
 */
module.exports = async (oldState, newState) => {
    if((oldState.member.bot) || (newState.member.bot)) return;
    
    let newUserChannel = newState.channel;
    let oldUserChannel = oldState.channel;

    if (oldUserChannel === null && newUserChannel !== null) { // This user has join the channel.
        Activites.set(oldState.id, Date.now());
    }
    let data;
    if(!Activites.has(oldState.id)){
        data = Date.now();
        Activites.set(oldState.id, data); // check current data for the existence of
    }
    else
        data = Activites.get(oldState.id);
    let duration = Date.now() - data;
    if(oldUserChannel !== null && newUserChannel === null) { // This user has left the channel.
        if(!Activites.has(oldState.id)) return;
        Activites.delete(oldState.id);
        ses.topla(`stats.${oldState.guild.id}.${oldState.guild.id}.${oldState.id}.channels.${oldUserChannel.id}`, duration);
        ses.yaz(`stats.${oldState.guild.id}.${oldState.guild.id}.${oldState.id}.activity`, Date.now());
    }
    else if (
        oldUserChannel !== null &&
        newUserChannel !== null &&
        oldUserChannel.id != newUserChannel.id
      ){ // This user has changes the channel.
        Activites.set(oldState.id, Date.now());
        ses.topla(`stats.${oldState.guild.id}.${oldState.guild.id}.${oldState.id}.channels.${oldUserChannel.id}`, duration);
        ses.yaz(`stats.${oldState.guild.id}.${oldState.guild.id}${oldState.id}.activity`, Date.now());
    }
};

module.exports.conf = {
    event: "voiceStateUpdate"
};
