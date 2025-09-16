import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";

import dotenv from 'dotenv/config';

// Refference:
// https://docs.arcjet.com/get-started

// init arcjet
export const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules:  [
        // shield protects your app from common attacks e.g SQL injection, XSS, CSRF attack, etc.
        shield({mode: "LIVE"}),
        detectBot({
            mode: "LIVE",
            // block all the bots except search engine bots
            allow:[
                "CATEGORY:SEARCH_ENGINE"
                // see the full list of categories at https://arcjet.com/bot-list
            ]
        }),
        // rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // per minute
            interval: 10,
            capacity: 10,
        })
    ]
});