const express = require('express');
const chatRouter = express.Router();
const chatController = require('../controller/chatController')
const authnticateUser = require('../middleware/auth');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

chatRouter.post('/add-contact', authnticateUser, chatController.addContact)
chatRouter.get('/getChatList', authnticateUser, chatController.getChatList);
chatRouter.post('/add-message', authnticateUser, chatController.addMessage);
chatRouter.post('/get-chat', authnticateUser, chatController.getChat)
chatRouter.post('/create-group', authnticateUser, chatController.createGroup)
chatRouter.post('/getMembersList', authnticateUser, chatController.getMembersList)
chatRouter.post('/actionOnGroup', authnticateUser, chatController.actionOnGroup)
chatRouter.post('/add-message-to-group', authnticateUser, chatController.addMessageToGroup);
chatRouter.post('/get-chat-from-group', authnticateUser, chatController.getChatFromGroup);
chatRouter.post('/add-file', authnticateUser, upload.single('file'), chatController.addfile);
chatRouter.post('/add-fileToGroup', authnticateUser, upload.single('file'), chatController.addfileToGroup);

module.exports = chatRouter;