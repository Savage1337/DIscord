/*******************************************************/
/*©Copyright |Savage!#1154 Discord| |Savage1337 GitHub|*/
/*      Use this for educational/self-use purposes.    */
/*******************************************************/

const Discordjs = require('discord.js');
const client = new Discordjs.Client();
const config = require('./config.json');

//NPM packages that we need for the commands
const ms = require('ms');
const moment = require('moment');

var t = Date.now();

client.on('ready', () => {
    console.log(`Bot ready.\n${client.user.tag}\nSet up took ${Math.round(Date.now() - t) / 1000} sec`); //Some diagnostics, I usually want to know the name of the account we logged into. The time is just a thing to check connection/load.
});

const p = config.prefix;


client.on('message', async message => {

    //We don't want our bot to respond to other bots.
    if(message.author.bot) return;

    //Let our bot ignore all messages that don't start with our prefix.
    if(message.content[0] !== p) return;

    //Defining some things before we start coding our commands.
    const command = message.content.split(' ')[0].slice(p.length);
    const args = message.content.split(' ').slice(1);
    

    /***********************/
    /*                     */
    /*         PING        */
    /*                     */
    /***********************/
    if(command === 'ping') {
        
      var msg = await message.channel.send('Getting ping...');
      msg.edit(`My ping is: \`${msg.createdTimestamp - message.createdTimestamp}ms\`. Discord's API latency is: \`${Math.round(client.ping)}ms\`.`);
    }
    /***************************************************************************************/



    /***********************/
    /*                     */
    /*         MUTE        */
    /*                     */
    /***********************/
    if(command === 'mute') {

        //first make sure only we can mute. In between the [brackets] we put all the role names that can mute. i.e. Admin
        if(!message.member.roles.some(r=> ['Admin', 'Moderator'].includes(r.name))) return message.channel.send(`You can't mute people.`);

        var time = ms(args.slice(1).join(' '));

        //Check if the bot has permission to change channel settings (member overwrites)
        if(!message.guild.me.hasPermission("MANAGE_CHANNELS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I don't have permission to change channel settings.\nEnable \`Manage Channels\` in the server settings for me!`);

        //SEND HALP
        if(args[0] === 'help') return message.channel.send(`${p}mute [@mention] [time]\nExample: ${p}mute ${message.guild.me.user} 1d`);


        //Let the bot know who we are actually muting.
        var member = message.mentions.members.first();
        if(message.mentions.members.size < 1) return;

        //Mute a d00d/d00dette for ever.
        if(time === undefined || time === NaN) time = "permanent";

        //Check if the member is already muted on the channel
        message.channel.permissionOverwrites.forEach(overwrite => {
            if(overwrite.id !== member.user.id) return;
            overwrite.delete('New mute.');
        });

        //we will just mute them on that specific channel, otherwise we might as well ban them amirite.
        message.channel.overwritePermissions(member, {
            SEND_MESSAGES: false,
        });

        //Let the author know the bot actually muted someone
        message.channel.send(`${member.user} is now muted here.`);

        //Stop from setting a timeout when we permanently muted someone
        if(time === "permanent") return;


        //Write our unmute function.
        function unmute() {

            //Gotta get our member again. Don't have to check for tags because the message is cached.
            var member = message.mentions.members.first();

            //Don't set SEND_MESSAGES to true, if you do that and the user gets removed from a role that has access to that channel he will still be able to send & read messages there. Even without the role.
            message.channel.overwritePermissions(member, {
                SEND_MESSAGES: null,
            });
        };

        //Set our unmute timer. Be careful, JavaScript has a max value (number). If you mute someone for too long (~25 days) the app will crash.
        /****************************************/
        /*     if(time > 2147483647) return;    */
        /*Code to stop when the mute is too long*/
        /****************************************/
        setTimeout(unmute, time);
    }
    /***************************************************************************************/



    /***********************/
    /*                     */
    /*         BAN         */
    /*                     */
    /***********************/
    if(command === 'ban') {

        //first make sure only we can mute. In between the [brackets] we put all the role names that can mute. i.e. Admin
        if(!message.member.roles.some(r=> ['Admin'].includes(r.name))) return message.channel.send(`You can't ban people.`);

        //SEND HALP
        if(args[0] === 'help') return message.channel.send(`${p}ban [@mention] [reason]\nExample: ${p}ban ${message.guild.me.user} shit bot`);

        //Check if the bot has ban permissions.
        if(!message.guild.me.hasPermission("BAN_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I don't have permission to ban members.\nEnable \`ban members\` in the server settings for me!`);

        //Check if the author actually tagged someone.
        if(message.mentions.members.size < 1) return;

        //Let the bot know who we are banning today.
        var member = message.mentions.members.first();

        //Make sure we don't ban the author, that would be embarrassing.
        if(message.author.id === member.user.id) return message.channel.send(`Self harm is bad.`);

        //Let the bot know the reason for banning, defaults to "No reason provided".
        var reason = args.slice(1).join(' ');
        if(reason.length <1) reason = "No reason provided.";//We don't want to give an empty reason. Reasons are bae <3

        //Check if the bot can even ban the member.
        if(!member.bannable) return message.channel.send(`I can't ban ${member.user}`);

        //Let the member know he was banned and why.
        await member.send(`You got banned from ${message.guild.name}\n\nBy: ${message.author.tag}\n\nReason: ${reason}`);

        //And finnaly swing the hammer.
        message.guild.ban(member, reason).catch(err => console.log(err));

    }
    /***************************************************************************************/



    /***********************/
    /*                     */
    /*         KICK        */
    /*                     */
    /***********************/
    if(command === 'kick') {
      //first make sure only we can mute. In between the [brackets] we put all the role names that can mute. i.e. Admin
      if(!message.member.roles.some(r=> ['Admin'].includes(r.name))) return message.channel.send(`You can't kick people.`);

      //SEND HALP
      if(args[0] === 'help') return message.channel.send(`${p}kick [@mention] [reason]\nExample: ${p}kick ${message.guild.me.user} shit bot`);

      //Check if the bot has kick permissions.
      if(!message.guild.me.hasPermission("KICK_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send(`I don't have permission to kick members.\nEnable \`ban members\` in the server settings for me!`);

      //Check if the author actually tagged someone.
      if(message.mentions.members.size < 1) return;

      //Let the bot know who we are banning today.
      var member = message.mentions.members.first();

      //Make sure we don't kick the author, that would be embarrassing.
      if(message.author.id === member.user.id) return message.channel.send(`Self harm is bad.`);

      //Let the bot know the reason for banning, defaults to "No reason provided".
      var reason = args.slice(1).join(' ');
      if(reason.length <1) reason = "No reason provided."; //Make sure our reason is not empty.

      //Check if the bot can even ban the member.
      if(!member.kickable) return message.channel.send(`I can't kick ${member.user}`);

      //Let the member know he was kicked and why.
      await member.send(`You got kicked from ${message.guild.name}\n\nBy: ${message.author.tag}\n\nReason: ${reason}`);

      //And finnaly boop him with the boot.
      member.kick(reason);
    }
    /***************************************************************************************/



    /***********************/
    /*                     */
    /*       USERINFO      */
    /*                     */
    /***********************/
    if(command === 'userinfo' || command === 'whois') { //Lots of bots have different names for these commands so lets accept 2 of them, add more if you so desire.

      //Let the bot know who we have to send userinfo from.
      var member = message.mentions.members.first();
      if(!member) member = message.member; //Default the member to the author of the message.

      //Write down all the info we want to send so the message stays nice and clean.

      var discordTag = member.user.tag; //Discord.js has a user property named "tag", this is the username + discriminator. For example: Savage!#1154

      var joindate = moment(member.joinedAt).format('LLLL'); //We use the NPM package "moment" for better formatting in dates.

      var joinedAgo = ms(message.createdTimestamp - member.joinedTimestamp, { long:true });

      var registerdate = moment(member.user.createdAt).format('LLLL');

      var status = member.user.presence.status.toString();
      status = status[0].toUpperCase() + status.slice(1,status.length); //Format the status so it starts with an uppercase letter. (looks better than lowercase letters)

      var game = 'None';
      if(member.user.presence.game) game = member.user.presence.game.name; //If the member is playing a game we want to say the name of the game he or she is playing.

      //For the roles we will use a forEach loop.
      var roles = [];
      member.roles.forEach(role => {
      if(role.id === message.guild.id) return; //Filter out the @everyone role.
      roles.push(role.name);
      });
      if(roles.length < 1) roles.push('None'); //Add a "None" when the member doesn't have any roles.

      //With the userinfo command I like to send embedded messages as they are easier to look through and less text. This is what a pretty filled embed looks like.
      message.channel.send({
        embed:{
          author:{
            name: discordTag,
            icon_url: member.user.avatarURL, //The avatar from the member.
          },
          description: `Joined ${joinedAgo} ago.`,
          color: message.guild.me.highestRole.color, //The bot's highest role color.

          fields:[
            {
              name: "Join date",
              value: joindate,
            },
            {
              name: "Register date",
              value: registerdate,
            },
            {
              name: "Status",
              value: status,
            },
            {
              name: "Game",
              value: game,
            },
            {
              name: "Roles",
              value: roles.join(', '), //"roles" is an array of role names. The array looks like this: ["rolename1", 'rolename2', 'rolename3']. With the "join" method we put a ", " in between them so it looks like: rolename1, rolename2, rolename3.
            }
          ],
          footer:{
            icon_url: client.user.avatarURL, //The avatar from the bot account.
            text: client.user.username, //The username from the bot account. (gotta advertise it amirite)
          },
      },
    });
    }
    /***************************************************************************************/



    /***********************/
    /*                     */
    /*         BOT         */
    /*                     */
    /***********************/
    if(command === 'bot') { //This command is for bot settings. To make sure only you can use it we are checking the user ID from the author of the message.
      if(message.author.id !== config.botOwner) return message.channel.send(`Only my master can use this command.`);
      var action = args[0]; //The thing we want to change, like game, status etc.
      var overwrite = args.slice(1).join(' ');
      if(!args[1]) return;

      if(action === 'game') { //Set the game that the bot is playing.
        if(client.user.presence.game && client.user.presence.game.name === overwrite) return; //Check if the bot isn't already playing that game.
        client.user.setActivity(overwrite);
      } else

      if(action === 'status') { //Set the status, either online, dnd, idle or invisible.
        if(client.user.presence.status === overwrite.toLowerCase()) return; //Check if the bot doesn't already have that status.
        client.user.setStatus(overwrite);
      } else

        if(action === 'avatar' || action === 'pfp') { //Change the bot account's profile picture. Or in rich people talk "avatar".
          client.user.setAvatar(overwrite).catch(e => message.channel.send(`Stop changing my pfp already! Make up your mind. You can try again in 30 minutes.`));
        } else

        if(action === 'username' || action === 'name') { //Change the bot account's username. Pretty straightforward.
        if(overwrite === client.user.username) return; //Check if the bot account's username already is that.
          client.user.setUsername(overwrite).catch(e => message.channel.send(`Name change moving so fast nobody will notice that it doesn't work. Try again in 30 minutes.`));
        }

    }
    /***************************************************************************************/
});

client.login(config.token);
