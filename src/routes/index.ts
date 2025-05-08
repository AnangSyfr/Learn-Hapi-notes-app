import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import { addNoteHandler, getAllNotesHandler } from "../handler/notes";

const routes: ServerRoute<ReqRefDefaults>[] = [
    {
        method: "GET",
        path: "/",
        handler: () => {
            return `Hello World`;
        },
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler,
    },
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
];

export default routes;
