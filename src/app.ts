import { envs } from "./config/envs";
import { MongoDB } from "./data/mongo/init";
import { AppRoutes } from "./model/routes";
import { MainServer } from "./model/server";

(async () => {
    main();
})();

async function main() {

    await MongoDB.connect({
        mongoURI: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })

    const server = new MainServer({
        port: envs.PORT,
        routes: AppRoutes.routes,
    })

    server.start();
}