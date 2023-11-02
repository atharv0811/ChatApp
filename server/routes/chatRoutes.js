const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controller/chatController')
const authnticateUser = require('../middleware/auth');

chatRouter.post('/add-contact', authnticateUser, chatController.addContact)
chatRouter.get('/getChatList', authnticateUser, chatController.getChatList);
chatRouter.post('/add-message', authnticateUser, chatController.addMessage);
chatRouter.post('/get-chat', authnticateUser, chatController.getChat)
chatRouter.post('/create-group', authnticateUser, chatController.createGroup)
chatRouter.get('/getMembersList', authnticateUser, chatController.getMembersList)
chatRouter.post('/add-group-member', authnticateUser, chatController.addMemberToGroup)
chatRouter.post('/add-message-to-group', authnticateUser, chatController.addMessageToGroup);
chatRouter.post('/get-chat-from-group', authnticateUser, chatController.getChatFromGroup);

module.exports = chatRouter;