
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("DISCORD BOT YO");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});


const discord = require("discord.js")
const client = new discord.Client()
const { TOKEN, CHANNEL_ID, SERVER_CHANNEL_ID } = require("./config.json");
const YouTubeNotifier = require('youtube-notification');


client.on("ready", () => {
  console.log("Watching " + CHANNEL_ID.length  + " Channels")
})

const notifier = new YouTubeNotifier({
  hubCallback: 'https://necessary-probable-slouch.glitch.me/yt',
  secret: 'JOIN_MY_SERVER_OR_DIE'
});


notifier.on('notified', data => {
  console.log('New Video');
  client.channels.cache.get(SERVER_CHANNEL_ID).send(
    `**${data.channel.name}** just uploaded a new video - **${data.video.link}**`
  );
});
 
notifier.subscribe(CHANNEL_ID);

app.use("/yt", notifier.listener());


client.login(TOKEN)
