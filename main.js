const fetch = require('node-fetch').default;

const CONFIG = require('./config.json');
const API_ENDPOINT = 'https://inspirobot.me/api?generate=true';

function sendPoem() {
    fetch(API_ENDPOINT)
        .then((res) => {
            console.log(res);
            res.text()
                .then((url) => {
                    console.log(url);
                    fetch(CONFIG.webhook, {
                        method: 'post',
                        body: JSON.stringify({
                            content: url,
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(console.log)
                        .catch(console.error);
                })
                .catch(console.error);
        })
        .catch(console.error);
}

sendPoem();
setInterval(sendPoem, 1000 * 60 * 5);
