const index = require('./index');

const createUserService = async(params) => {
    const userModel = await index.getModel();
    const newUser = new userModel(params);
    const saveUser = await newUser.save();
    return saveUser;
};

const checkUserExists = async(params) => {
    const userModel = await index.getModel();
    const result = await userModel.findOne({
        email: params.email,
    });
    return result;
};

module.exports = {
    createUserService,
    checkUserExists,
};