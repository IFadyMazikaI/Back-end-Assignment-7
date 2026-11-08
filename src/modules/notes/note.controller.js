import { Router } from 'express';
import { successResponse } from '../../common/utils/index.js';
import { aggregateNotes, createNote, deleteAllNotes, deleteNote, getNoteByContent, getNoteById, getNotesWithUser, getPaginatedNotes, replaceNote, updateAllNotes, updateNote } from './note.service.js';
const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const data = await createNote(req.query.id, req.body);
        return successResponse({res,data,statusCode: 201});
    } catch (error) {
        next(error);
    }
});


router.patch('/all', async (req, res, next) => {
    try {
        const data = await updateAllNotes(req.query.id,req.body.title);
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});


router.get('/paginate-sort', async (req, res, next) => {
    try {
        const data = await getPaginatedNotes(
            req.query.id,
            Number(req.query.page),
            Number(req.query.limit)
        );
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});


router.get('/note-by-content', async (req, res, next) => {
    try {
        const data = await getNoteByContent(
            req.query.id,
            req.query.content
        );
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});


router.get('/note-with-user', async (req, res, next) => {
    try {
        const data = await getNotesWithUser(req.query.id);
        return successResponse({res,data
        });
    } catch (error) {
        next(error);
    }
});


router.get('/aggregate', async (req, res, next) => {
    try {
        const data = await aggregateNotes(
            req.query.id,
            req.query.title
        );
        return successResponse({res,data
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/', async (req, res, next) => {
    try {
        const data = await deleteAllNotes(req.query.id);
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});


router.patch('/:noteId', async (req, res, next) => {
    try {
        const data = await updateNote(req.params.noteId,req.query.id,req.body);
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});



router.put('/replace/:noteId', async (req, res, next) => {
    try {
        const data = await replaceNote(req.params.noteId,req.query.id,req.body);
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});

router.delete('/:noteId', async (req, res, next) => {
    try {
        const data = await deleteNote(req.params.noteId,req.query.id);
        return successResponse({ res,data
        });
    } catch (error) {
        next(error);
    }
});


router.get('/:noteId', async (req, res, next) => {
    try {
        const data = await getNoteById(req.params.noteId,req.query.id);
        return successResponse({res,data});
    } catch (error) {
        next(error);
    }
});

export default router;