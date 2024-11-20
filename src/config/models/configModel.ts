export type ConfigModel = {
    server: {
        host: string,
        port: number
    },
    DB: {
        mongo: {
            connectionString: string   
        }
    }
}