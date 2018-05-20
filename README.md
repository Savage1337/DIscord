# DiscordBot
Basic Discord moderation bot written in JavaScript with a Node.js framework. Used library is [discord.js](https://discord.js.org/#/).

# Installation (Follow the [Quick start guide](https://github.com/Savage1337/DiscordBot#quick-start-guide) if you are lazy) 

Make sure you have Node.js installed and updated. To install it, simply download the installer from [the website](https://nodejs.org/en/). If you need to update it use this command in the command prompt: `npm update npm -g`.

Now clone or download this repository. Simply click the green button that says `Clone or download` and click `Download ZIP`. Unpack the zip file to somewhere on your pc.

When you're done getting the repository on your PC. Open the command prompt, make sure you're in the right directory. To install all dependencies that we need, run the `npm install` command.

# Creating Discord bot account

Head over to the Discord [developers page](https://discordapp.com/developers/applications/me). Create a new app by clicking the `+` sign that says `New App`. Give your bot a name (this name will be the username of your bot account and the role that is being created for the bot. You can change this at all times. While we're at it also give your bot a profile picture. If you did everything correctly you should be on a page that says `GREAT SUCCESS! Your sweet new application has been created successfully!`. To create the bot user account, scroll down to the button that says `Create a Bot User`. Click the button and confirm it. Now we are going to invite the bot. The invite link looks like this when you add `Administrator` permissions: https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=[Your bot client ID].
Go back to the top of the page and find the `Client ID` under `APP DETAILS`. Copy the client ID and paste in to the end of the URL above.

Example: https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=0000000000000000001

Open the link, select the server you want your bot to be in (This requires `Manage server` permissions) and click `Authorize`. 
Copy the token, it should be hidden behind the `Click to reveal` button.
Paste your token into the config.json file (change config_example.json to config.json). 
Your account's dev ID can be found by right clicking your discord name(from a message) and clicking copy ID. If you can't find it, enable Developer mode under `Discord settings` > `Appearance` > `Developer mode`.

If you did all of this correctly, open the command prompt in the folder and type `node bot.js`. The bot should reply with `Bot ready. [your bot username and discriminator] Set up took [x seconds]`.


# Quick start guide

1. Download or update Node.js

2. Clone or download this repository (green button at the top right)

3. Open a command prompt and type `npm install`. Hit enter. If it gives some errors when it finishes, don't worry. You should be fine.

4. Wait...

5. Create a new app on the [Discord developer page](https://discordapp.com/developers/applications/me/).

6. Click `Create a Bot User`

7. Copy the client ID (at the top of the page) and paste it in this link: https://discordapp.com/oauth2/authorize/?permissions=2146958591&scope=bot&client_id=[client ID]

8. Add your bot to the server (requires Manage server permissions)

9. Copy your bot token and paste it into a file like `config_example.json`, name the file `config.json`.

10. Grab your account's dev ID. Right click your username from a message or in the member list and click `Copy ID`. If you can't find it, enable Developer mode under `Discord settings` > `Appearance` > `Developer mode`. Paste it into the `config.json` file.

11. Open a console in the bot folder. `Shuft + right click` > `Open Command promt` or `Open powershell`. Type `node app.js` and hit enter.
