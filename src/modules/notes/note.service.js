import mongoose from 'mongoose';
import { NoteModel } from '../../DB/model/index.js';

export const createNote = async (userId, inputs) => {
    const { title, content } = inputs;
    const note = await NoteModel.create({title,content,userId
    });
    return note;
};


export const updateNote = async (noteId, userId, inputs) => {
    const note = await NoteModel.findById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const updatedNote = await NoteModel.findByIdAndUpdate(noteId,inputs,{ new: true });
    return updatedNote;
};


export const replaceNote = async (noteId, userId, inputs) => {
    const note = await NoteModel.findById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const updatedNote = await NoteModel.findOneAndReplace(
        { _id: noteId },
        {
            title: inputs.title,
            content: inputs.content,
            userId: inputs.userId
        },
        {
            new: true,
            runValidators: true
        }
    );
    return updatedNote;
};


export const updateAllNotes = async (userId, title) => {
    const result = await NoteModel.updateMany(
        { userId },
        { title }
    );
    if (result.matchedCount === 0) {
        throw new Error('No note found');
    }
    return {
        message: 'All notes updated'
    };
};



export const deleteNote = async (noteId, userId) => {
    const note = await NoteModel.findById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    const deletedNote = await NoteModel.findByIdAndDelete(noteId);
    return deletedNote;
};


export const getPaginatedNotes = async (userId, page, limit) => {
    const skip = (page - 1) * limit;
    const notes = await NoteModel.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
    return notes;
};


export const getNoteById = async (noteId, userId) => {
    const note = await NoteModel.findById(noteId);
    if (!note) {
        throw new Error('Note not found');
    }
    if (note.userId.toString() !== userId) {
        throw new Error('You are not the owner');
    }
    return note;
};


export const getNoteByContent = async (userId, content) => {
    const note = await NoteModel.findOne({userId,content});
    if (!note) {
        throw new Error('No note found');
    }
    return note;
};


export const getNotesWithUser = async (userId) => {
    const notes = await NoteModel.find({ userId })
        .select('title userId createdAt')
        .populate({
            path: 'userId',
            select: 'email'
        });
    return notes;
};



export const aggregateNotes = async (userId, title) => {
    const match = {
        userId: new mongoose.Types.ObjectId(userId)
    };
    if (title) {
        match.title = title;
    }
    const notes = await NoteModel.aggregate([
        {
            $match: match
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: '$user'
        },
        {
            $project: {
                _id: 0,
                title: 1,
                userId: 1,
                createdAt: 1,
                user: {
                    name: '$user.name',
                    email: '$user.email'
                }
            }
        }
    ]);
    return notes;
};


export const deleteAllNotes = async (userId) => {
    const result = await NoteModel.deleteMany({userId});
    return {
        message: 'Deleted'
    };
};