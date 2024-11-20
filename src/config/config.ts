import { ConfigModel } from "./models/configModel";

export const config: ConfigModel = {
    server: {
        host: '127.0.0.1',
        port: 8080
    },
    DB: {
        mongo: {
            connectionString: ''
        }
    }
}