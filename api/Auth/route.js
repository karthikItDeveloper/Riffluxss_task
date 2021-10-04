/* eslint-disable no-unused-vars */
const express = require('express');
const trimRequest = require('trim-request');

const router = express.Router();
const { celebrate } = require('celebrate');
const controlHandler = require('../../middleware/controller-handler');
const controller = require('./controller');
const schema = require('./schema');

router.post('/register', trimRequest.body, celebrate(schema.createUser), controlHandler.json(controller.createUser, (req, res, next) => [req.body]));

router.post('/login', trimRequest.body, celebrate(schema.userLogin), controlHandler.json(controller.userLogin, (req, res, next) => [req.body]));


module.exports = router;