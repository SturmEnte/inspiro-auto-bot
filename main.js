require('dotenv').config();
const fetch = require('node-fetch').default;

const CONFIG = process.env;
const API_ENDPOINT = 'https://inspirobot.me/api?generate=true';

function sendPoem() {
    // Fetches a new image url from inspirobot.me
    fetch(API_ENDPOINT)
        .then((res) => {
            // Formats the response in a way that the url can be used
            res.text()
                .then((url) => {
                    // Sends the image to the webhook which sends it into the channel
                    fetch(CONFIG.WEBHOOK, {
                        method: 'post',
                        body: JSON.stringify({
                            content: url,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).catch(console.error);
                })
                .catch(console.error);
        })
        .catch(console.error);
}

// Triggers the function on start
sendPoem();
// Creates an interval which will trigger the specified function every 5 minutes
setInterval(sendPoem, 1000 * 60 * 5);
