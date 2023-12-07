module.exports = {
    devServer: {
        client: {
            webSocketURL: process.env.VUE_APP_WEBSOCKET_URL || 'localhost:3000',
        },
        allowedHosts: [
            'jakwywioze.pl',
            'www.jakwywioze.pl'
        ]
    }
}