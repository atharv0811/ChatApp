const express = require('express');
const chatRouter = express.Router();
const authnticateUser = require('../middleware/auth');
const chatController = require('../controller/chatController')

chatRouter.post('/add-contact', authnticateUser, chatController.addContact)
chatRouter.get('/getChatList', authnticateUser, chatController.getChatList);
chatRouter.post('/add-message', authnticateUser, chatController.addMessage);


module.exports = chatRouter;