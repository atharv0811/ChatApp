const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const cors = require("cors");
require('dotenv').config();
const userRouter = require('./routes/userRoutes');
const sequelize = require("./db");
const chatRouter = require("./routes/chatRoutes");
const ChatMembersData = require("./model/chatMemberModel");
const userDB = require("./model/userModel");
const chatStorageDb = require("./model/chatStorageModel");
const GroupName = require("./model/groupModel");
const GroupMembers = require("./model/groupMemberModel");
const GroupChatStorage = require("./model/groupStorageModel");
const GroupFileModal = require('./model/groupFileModel');
const ChatFileModal = require('./model/chatFileModel');
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "*"
}));

app.use('/user', userRouter);
app.use('/chat', chatRouter);

userDB.hasMany(ChatMembersData);
ChatMembersData.belongsTo(userDB);
userDB.hasMany(chatStorageDb);
chatStorageDb.belongsTo(userDB);
userDB.hasMany(GroupName);
GroupName.belongsTo(userDB);
userDB.hasMany(GroupMembers);
GroupMembers.belongsTo(userDB);
GroupName.hasMany(GroupMembers);
GroupMembers.belongsTo(GroupName);
GroupName.hasMany(GroupChatStorage);
GroupChatStorage.belongsTo(GroupName);
userDB.hasMany(ChatFileModal);
ChatFileModal.belongsTo(userDB);
GroupName.hasMany(GroupFileModal);
GroupFileModal.belongsTo(GroupName);


sequelize.sync({ force: false, logging: false }).then(() => {
    http.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})

io.on('connection', socket => {
    console.log('connected at' + socket.id)
    socket.on('send-message', (data) => {
        io.emit('receive-message', data)
    })
    socket.on('send-file', (data) => {
        io.emit('receive-file', data)
    })
})