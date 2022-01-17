//libraries
import Discord from "discord.js"
import { exit } from "process"
import cron from "node-cron"

//constants from config
import { token, channelID, roleID, minuteOffset } from "./config.js"

if (token == "TOKEN GOES HERE" ||
    channelID == "CHANNNEL ID" ||   
    roleID == "ROLE ID") {
        console.error("Please configure config.js before running")
        exit()
}

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
    /* "debug": {
        "cron": "0/5 * * * * *",
        "message":", this is a test"
    } */
}

//init discord.js
const client = new Discord.Client()
client.login(token)

client.on("ready", () => {
    console.log(`${client.user.tag} is now online.`)
    client.channels.fetch(channelID).then((channel) => {
        channel.send("mudae-reminder is now online")
    })
    //schedule reminders
    for (let reminder in remindObj){
        cron.schedule(remindObj[reminder].cron, () => {
            client.channels.fetch(channelID)
                .then((channel) => {
                    channel.send(remindObj[reminder].message)
                    console.log(`${reminder} reminder sent`)
                })
                .catch(console.error)
        }, {
            //TODO: timezone configuration
            "timezone":"America/Los_Angeles"
        })
        console.log(`${reminder} reminder scheduled:`)
        console.log(`${remindObj[reminder]}`)
    }
})
