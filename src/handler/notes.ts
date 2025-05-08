import { HandlerDecorations, Lifecycle, ReqRefDefaults } from "@hapi/hapi";
import { nanoid } from "nanoid";
import notes, { INotes } from "../data/notes";

type TAddNote =
    | HandlerDecorations
    | Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>
    | undefined;

const addNoteHandler: TAddNote = (request, h) => {
    const { title, tags, body } = request.payload as INotes;

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        id,
        title,
        tags,
        body,
        createdAt,
        updatedAt,
    };
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id == id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "catatan berhasil ditambahkan",
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "catatan gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const getAllNotesHandler = () => ({
    status: "success",
    data: {
        notes,
    },
});

export { addNoteHandler, getAllNotesHandler };
