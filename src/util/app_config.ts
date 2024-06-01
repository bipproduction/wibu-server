import os from 'os'

const app_config = {
    title: 'Wibu Server',
    description: 'Server Untuk Wibu',
    host: os.platform() === "darwin" ? "http://localhost:3005" : "https://wibu-server.wibudev.com",
    isLocal: os.platform() === "darwin",
    dev: {
        isDev: false,
        cwd: process.cwd()
    }

}

export default app_config