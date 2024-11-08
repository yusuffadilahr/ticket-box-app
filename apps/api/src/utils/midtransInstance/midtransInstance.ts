let midtransClient = require('./midtrans-client-nodejs/index.js');

const snap = new midtransClient.Snap({
    isProduction: false, // Set to true in production
    serverKey: process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-B0kYuCg7QMsex2SzO1RqHxTQ',
    clientKey: process.env.MIDTRANS_CLIENT_KEY || 'SB-Mid-client-O70yIUv1Lx0wK6Hj',
});

export default snap;