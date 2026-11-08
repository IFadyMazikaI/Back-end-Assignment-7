import { UserModel } from '../../DB/model/index.js';

export const signup = async (inputs) => {
    const { email } = inputs;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        throw new Error('Email already exists');
    }
    const user = await UserModel.create(inputs);
    return user;
};



export const login = async (inputs) => {
    const { email, password } = inputs;
    const user = await UserModel.findOne({email,password});
    if (!user) {
        throw new Error('Invalid email or password');
    }
    return user;
};



export const updateUser = async (id, inputs) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    if (inputs.email) {
        const emailExist = await UserModel.findOne({
            email: inputs.email,
            _id: { $ne: id }
        });
        if (emailExist) {
            throw new Error('Email already exists');
        }
    }
    const { password, ...updateData } = inputs;
    await UserModel.findByIdAndUpdate(id, updateData);
    return {message: 'User updated'};
};


export const deleteUser = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        throw new Error('User not found');
    }
    return {message: 'User deleted'};
};


export const getUser = async (id) => {
    const user = await UserModel.findById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};