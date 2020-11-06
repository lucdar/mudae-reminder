const { DiscordAPIError } = require("discord.js")

{/*private key in here :)*/
    var privateKey = "NzM2Mzc1NDc3NzY1MTQ0NTg2.Xxt5Gw.3fc3b4UdCxQVwPSLvYMMNsd312Y"
}

//libraries :D
var cron = require('node-cron')

//Init. discord.js
const Discord = require("discord.js")
const { send } = require("process")
const client = new Discord.Client()
client.login(privateKey)

client.on("ready", () => {
    console.log(`${client.user.tag} Bot is now online.`)
    client.channels.fetch(channelID).then((channel) => {
        // channel.send(`<@&${roleID}> I'M BACK :D`)
    })
    //schedule waifu reminders
    scheduleWaifuReminders()
})

let channelID = '753500455497105438'
let roleID = '752034309560467488'

function scheduleWaifuReminders() {
        for (let reminder in remindObj){
        cron.schedule(remindObj[reminder].cron, () => {
            client.channels.fetch(channelID)
                .then((channel) => {
                    channel.send(remindObj[reminder].message)
                })
                .catch(console.error)
        }, {
            "timezone":"America/Los_Angeles"
        })
        console.log(`${remindObj[reminder].cron}`)
    }
}

remindObj = {
    "waifuRolls": {
        "cron":"56 * * * *",
        "commands":"$w, $h, and variants",
        "message":`<@&${roleID}>, $h and $w have refreshed.`,
    },
    "marry": {
        "cron":"56 */3 * * *",
        "commands":"cooldown for marrying after rolling for a waifu",
        "message":`<@&${roleID}>, marry cooldown has reset.`,
    },
    "pokemonSlots": {
        "cron":"0 */2 * * *",
        "commands":"$p",
        "message":`<@&${roleID}>, pokeslots has reset.`,
    },
    "dailies":{
        "cron":"0 12 * * *",
        "commands":"$daily, $dk",
        "message":`<@&${roleID}>, dailies have reset.`,
    },
    // "debug - every second":{
    //     "cron": "* * * * * *",
    //     "message":", this is a test"
    // }
}