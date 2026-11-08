import { Router } from 'express';
import { successResponse } from '../../common/utils/index.js';
import { deleteUser, getUser, login, signup, updateUser } from './user.service.js';
const router = Router();

router.post('/signup', async (req, res, next) => {
    try {
        const data = await signup(req.body);
        return successResponse({ res, data, statusCode: 201 });
    } catch (error) {
        next(error);
    }
});


router.post('/login', async (req, res, next) => {
    try {
        const data = await login(req.body);
        return successResponse({ res, data, statusCode: 200 });
    } catch (error) {
        next(error);
    }
});


router.patch('/:id', async (req, res, next) => {
    try {
        const data = await updateUser(req.params.id, req.body);
        return successResponse({res,data,message: 'User updated'});
    } catch (error) {
        next(error);
    }
});


router.delete('/', async (req, res, next) => {
    try {
        const data = await deleteUser(req.query.id);
        return successResponse({ res, data });
    } catch (error) {
        next(error);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const data = await getUser(req.query.id);
        return successResponse({ res, data });
    } catch (error) {
        next(error);
    }
});

export default router;