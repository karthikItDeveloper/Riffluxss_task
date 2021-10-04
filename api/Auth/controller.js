const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const service = require('./service');

const createUser = async(params) => {
    if (!params.email) {
        throw boom.badRequest('Mail Id Requirred');
    }
    const encryptPasswd = await bcrypt.hash(params.password.trim(), 10);
    if (encryptPasswd) {
        params.password = encryptPasswd;
    } else {
        throw boom.badRequest('Password Hash Generation Problem.');
    }
    const checkUser = await service.checkUserExists(params);
    if (checkUser !== null && checkUser._id && checkUser._id !== '') {
        throw boom.badRequest('User Already Exists');
    }
    params.status = 1;
    const newUser = await service.createUserService(params);

    if (!newUser._id) {
        throw boom.badRequest('Something went wrong. Please try again.');
    }
    const result = {
        status: 200,
        message: 'User Registered Successfully',
    };
    return result;
};

const userLogin = async(params) => {
    let getUser = await service.checkUserExists(params);
    if (getUser === null || !getUser._id || !getUser.password) {
        throw boom.badRequest('Invalid Login Credentials.');
    }
    const match = await bcrypt.compare(params.password, getUser.password);
    if (!match) {
        throw boom.badRequest('Invalid Login Credentials.');
    }
    getUser = JSON.parse(JSON.stringify(getUser));
    delete getUser.password;
    const payload = {
        user_id: getUser._id,
        email: getUser.email,
        user_type: getUser.user_type,
    };
    const options = { expiresIn: '1d' };
    getUser.access_token = jwt.sign(payload, '!@#$1234', options);
    const result = {
        status: 200,
        message: 'User logged in Successfully',
        detail: getUser,
    };

    return result;
};

module.exports = {
    createUser,
    userLogin,
};