//libraries
const { DiscordAPIError } = require("discord.js")
var cron = require('node-cron')

//constants
//TODO: imoprt these from a file? json? module?
//      secure private key somehow? allow for opening repo to public?
{/*private key in here :)*/
    var privateKey = "NzM2Mzc1NDc3NzY1MTQ0NTg2.Xxt5Gw.3fc3b4UdCxQVwPSLvYMMNsd312Y"
}
let channelID = "753500455497105438"
let roleID = "752034309560467488"
let minuteOffset = '10'

let remindObj = {
    "roulette": {
        "cron":`&${minuteOffset} * * * *`,
        "message":`<@&${roleID}>, roulette cooldown has reset. ($m, $w, $h, etc.)`,
    },
    "marry": {
        "cron":`&${minuteOffset} 2/3 * * *`,
        "message":`<@&${roleID}>, claim cooldown has reset.`,
    },
    /* "pokemonSlots": {
        "cron":"0 0/2 * * *",
        "message":`<@&${roleID}>, pokeslots has reset. ($p)`,
    }, */
    "dailies": {
        "cron":"0 12 * * *",
        "message":`<@&${roleID}>, dailies have reset. ($daily, $dk)`,
    },
    /* "debug - every second": {
        "cron": "* * * * * *",
        "message":", this is a test"
    } */
}

//Init. discord.js
const Discord = require("discord.js")
const { send } = require("process")
const client = new Discord.Client()
client.login(privateKey)

client.on("ready", () => {
    console.log(`${client.user.tag} Bot is now online.`)
    client.channels.fetch(channelID).then((channel) => {
        channel.send("mudae-reminder online")
    })
    //schedule reminders
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
})
