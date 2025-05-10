import { HandlerDecorations, Lifecycle, ReqRefDefaults } from "@hapi/hapi";
import { nanoid } from "nanoid";
import notes, { INotes } from "../data/notes";

type THandler =
    | HandlerDecorations
    | Lifecycle.Method<ReqRefDefaults, Lifecycle.ReturnValue<ReqRefDefaults>>
    | undefined;

const addNoteHandler: THandler = (request, h) => {
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

const getNoteByIdHandler: THandler = (request, h) => {
    const { id } = request.params;

    const note = notes.filter((item) => item.id === id)[0];

    if (note) {
        return {
            status: "success",
            data: { note },
        };
    }

    const response = h.response({
        status: "fail",
        message: "catatan tidak ditemukan",
    });
    response.code(404);
    return response;
};

const editNoteByIdHandler: THandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload as INotes;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((item) => item.id === id);
    if (index > -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "catatan berhasil diperbarui",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "catatan gagal diperbarui",
    });
    response.code(404);
    return response;
};

const deleteNoteByIdHandler: THandler = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((item) => item.id === id);

    if (index > -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Catatan berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

export {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler,
};
