const express = require('express');
const trimRequest = require('trim-request');

const router = express.Router();
const { celebrate } = require('celebrate');
const controlHandler = require('../../middleware/controller-handler');
const { authorize } = require('../../middleware/middleware-config');
const controller = require('./controller');
const schema = require('./schema');

router.post('/', trimRequest.body, authorize([1]), celebrate(schema.addHotel), controlHandler.json(controller.addHotel, (req) => [req.body]));

router.put('/:hotel_id', trimRequest.body, authorize([2]), celebrate(schema.updateHotel), controlHandler.json(controller.updateHotel, (req) => [req.params, req.body]));

router.get('/list', celebrate(schema.listHotel), controlHandler.json(controller.listHotel, (req) => [req.params]));

router.get('/:hotel_id', celebrate(schema.getHotelDetails), controlHandler.json(controller.getHotelDetails, (req) => [req.params]));

module.exports = router;