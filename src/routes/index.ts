import { ReqRefDefaults, ServerRoute } from "@hapi/hapi";
import {
    addNoteHandler,
    deleteNoteByIdHandler,
    editNoteByIdHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
} from "../handler/notes";

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
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteByIdHandler,
    },
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "PUT",
        path: "/notes/{id}",
        handler: editNoteByIdHandler,
    },
    {
        method: "DELETE",
        path: "/notes/{id}",
        handler: deleteNoteByIdHandler,
    },
];

export default routes;
