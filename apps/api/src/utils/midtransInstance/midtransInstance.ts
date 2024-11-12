import dotenv from "dotenv";

let midtransClient = require('./midtrans-client-nodejs/index.js');

dotenv.config()
const snap = new midtransClient.Snap({
    isProduction: false, // Set to true in production
    serverKey: process.env.MIDTRANS_SERVER_KEY || '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || '',
});

export default snap;