import * as Hapi from "@hapi/hapi";
import routes from "./routes";

const init = async () => {
    const server = Hapi.server({
        port: "5000",
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
