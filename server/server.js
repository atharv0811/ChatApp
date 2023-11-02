const bodyParser = require("body-parser");
const express = require('express')
require('dotenv').config();
const cors = require("cors");
const userRouter = require('./routes/userRoutes');
const sequelize = require("./db");
const chatRouter = require("./routes/chatRoutes");
const ChatMembersData = require("./model/chatMemberModel");
const userDB = require("./model/userModel");
const chatStorageDb = require("./model/chatStorageModel");
const GroupName = require("./model/groupModel");
const GroupMembers = require("./model/groupMemberModel");
const GroupChatStorage = require("./model/groupStorageModel");
const app = express()
const port = 4000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ['GET', 'POST']
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

sequelize.sync()
    .then(() => {
        app.listen(port)
    })
    .catch(err => console.log(err))
