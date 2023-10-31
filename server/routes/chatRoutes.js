const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controller/chatController')
const authnticateUser = require('../middleware/auth');

chatRouter.post('/add-contact', authnticateUser, chatController.addContact)
chatRouter.get('/getChatList', authnticateUser, chatController.getChatList);
chatRouter.post('/add-message', authnticateUser, chatController.addMessage);
chatRouter.post('/get-chat', authnticateUser, chatController.getChat)


module.exports = chatRouter;