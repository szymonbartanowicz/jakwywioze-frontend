module.exports = {
    devServer: {
        client: {
            webSocketURL: process.env.VUE_APP_WEBSOCKET_URL || 'ws://localhost:3000/ws',
        },
        allowedHosts: [
            'jakwywioze.pl',
            'www.jakwywioze.pl'
        ]
    }
}