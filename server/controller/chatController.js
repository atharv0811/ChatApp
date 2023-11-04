const userDB = require('../model/userModel');
const chatMemberModel = require('../model/chatMemberModel');
const chatStorageModel = require('../model/chatStorageModel');
const moment = require('moment/moment');
const crypto = require('crypto');
const groupNameData = require('../model/groupModel');
const groupMember = require('../model/groupMemberModel');
const groupMemberModel = require('../model/groupMemberModel');
const groupChatStorage = require('../model/groupStorageModel');
const { Sequelize } = require('sequelize');
const sequelize = require('../db');

exports.addContact = async (req, res) => {
    try {
        const id = req.user.id;
        const phoneNo = req.user.phoneNo
        const contactName = req.body.data.name;
        const phone_No = req.body.data.phoneNo;

        let memberId = await userDB.findOne({
            where: {
                phoneNo: phone_No
            }
        })
        let parsedMemberId = parseInt(memberId.id);
        await chatMemberModel.create({
            id: getRandomInt(100000, 999999),
            ContactName: contactName,
            memberId: parsedMemberId,
            userDatumId: id
        });
        await chatMemberModel.create({
            id: getRandomInt(100000, 999999),
            ContactName: phoneNo,
            memberId: id,
            userDatumId: parsedMemberId
        });
        console.log("contact added")
        return res.status(201).json({ message: "contact added" });
    } catch (error) {
        console.log(error)
    }
}

exports.getChatList = async (req, res) => {
    const id = req.user.id;
    try {
        let chatlist = await chatMemberModel.findAll({ where: { userDatumId: id } });
        let grouplist = await groupMember.findAll({ where: { userDatumId: id } });

        if (!chatlist && !grouplist) {
            throw new Error('No Chats Found')
        }

        chatlist = chatlist.map(item => {
            return {
                id: item.id,
                name: item.ContactName,
                userDatumId: item.userDatumId,
                memberId: item.memberId,
                type: item.type
            };
        });

        let groupPromises = grouplist.map(async item => {
            const groupnameId = item.GroupNameId;
            let groupName = await groupNameData.findAll({ where: { id: groupnameId }, attributes: ['GroupName'] });
            return {
                id: item.id,
                name: groupName[0].GroupName,
                userDatumId: item.userDatumId,
                memberId: item.GroupNameId,
                type: item.type
            };
        });

        let resolvedGroups = await Promise.all(groupPromises);
        let combinedList = chatlist.concat(resolvedGroups);

        return res.status(201).json(combinedList);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.addMessage = async (req, res) => {
    try {
        const currentDateTime = req.body.data.currentDateTime;
        const messageText = req.body.data.messageText;
        const senderId = req.user.id;
        const memberId = parseInt(req.body.data.memberId);


        await chatStorageModel.create({
            id: getRandomInt(100000, 999999),
            recipeintId: memberId,
            messageText: messageText,
            date: currentDateTime,
            userDatumId: senderId
        })
        return res.status(201).json('success');
    } catch (error) {
        console.log(error)
    }
}

exports.getChat = async (req, res) => {
    try {
        const userId = parseInt(req.user.id);
        const memberId = parseInt(req.body.memberId);

        let chatListFirstCondition = await chatStorageModel.findAll({
            where: {
                recipeintId: memberId
            },
            order: [['date', 'DESC']],
            limit: 5
        });

        let chatListSecondCondition = await chatStorageModel.findAll({
            where: {
                recipeintId: userId,
                userDatumId: memberId
            },
            attributes: ['messageText', 'date', 'userDatumId', 'recipeintId'],
            order: [['date', 'DESC']],
            // limit: 5
        });

        let combinedChatList = chatListFirstCondition.concat(chatListSecondCondition);
        combinedChatList.sort((a, b) => {
            const dateA = moment(a.date, 'DD/MM/YYYY, hh:mm:ss A');
            const dateB = moment(b.date, 'DD/MM/YYYY, hh:mm:ss A');
            return dateA - dateB;
        });
        return res.status(201).json(combinedChatList);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.createGroup = async (req, res) => {
    try {
        const id = req.user.id;
        const name = req.user.name;
        const group_name = req.body.data.Groupname;
        const group = await groupNameData.create({
            id: getRandomInt(100000, 999999),
            GroupName: group_name,
            userDatumId: id
        });

        const GroupId = group.id;
        await groupMember.create({
            id: getRandomInt(100000, 999999),
            ContactName: name,
            isAdmin: true,
            userDatumId: id,
            GroupNameId: GroupId
        });

        return res.status(201).json({ message: "Group Created" });
    } catch (error) {
        console.log(error)
    }
}

exports.getMembersList = async (req, res) => {
    try {
        const action = req.body.action;
        const userId = parseInt(req.user.id);
        const groupId = parseInt(req.body.memberId);
        if (action == 'addMember') {
            const result = await chatMemberModel.findAll({
                where: {
                    userDatumId: userId,
                    memberId: {
                        [Sequelize.Op.notIn]: sequelize.literal(`(SELECT userDatumId FROM GroupMembers WHERE GroupNameId = ${groupId})`)
                    }
                }
            });
            return res.status(201).json(result);
        }
        if (action == 'removeMember') {
            const result = await groupMember.findAll({
                where: {
                    GroupNameId: groupId
                }
            })
            return res.status(201).json(result)
        }
        if (action == 'setAdmin') {
            const result = await groupMember.findAll({
                where: {
                    GroupNameId: groupId,
                    isAdmin: 0
                }
            })
            return res.status(201).json(result)
        }
        // const result = await chatMemberModel.findAll({ where: { userDatumId: userId } });
        // res.status(201).json(result);
    } catch (error) {
        console.log(error);
    }
}

exports.actionOnGroup = async (req, res) => {
    try {
        const GroupId = parseInt(req.body.data.groupId);
        const MemberId = parseInt(req.body.data.memberId);
        const name = req.body.data.contactName;
        const action = req.body.data.action;
        if (action === 'addMember') {
            await groupMemberModel.create({
                id: getRandomInt(100000, 999999),
                ContactName: name,
                userDatumId: MemberId,
                GroupNameId: GroupId
            })
            return res.status(201).json({ message: "success" });
        }
        if (action === 'removeMember') {
            await groupMember.destroy({ where: { userDatumId: MemberId, GroupNameId: GroupId } });
            return res.status(201).json({ message: "success" });
        }
        if (action === 'setAdmin') {
            await groupMember.update({ isAdmin: 1 }, { where: { userDatumId: MemberId, GroupNameId: GroupId } })
            return res.status(201).json({ message: "success" });
        }
    } catch (error) {
        console.log(error)
    }
}

exports.addMessageToGroup = async (req, res) => {
    try {
        const currentDateTime = moment().format('DD/MM/YYYY, hh:mm:ss A');
        const messageText = req.body.data.messageText;
        const memberId = parseInt(req.body.data.memberId);
        const senderId = req.user.id;
        await groupChatStorage.create({
            id: getRandomInt(100000, 999999),
            senderId: senderId,
            messageText: messageText,
            date: currentDateTime,
            GroupNameId: memberId
        })
        return res.status(201).json('success');
    } catch (error) {
        console.log(error)
    }
}

exports.getChatFromGroup = async (req, res) => {
    try {
        const groupId = parseInt(req.body.groupId);
        const userId = parseInt(req.user.id);
        let result = await groupChatStorage.findAll({
            where: {
                GroupNameId: groupId
            },
            order: [['date', 'DESC']],
            limit: 10
        });
        let isAdmin = await groupMember.findOne({
            where: {
                userDatumId: userId,
                GroupNameId: groupId,
                isAdmin: 1
            },
            attributes: ['isAdmin']
        });
        result.sort((a, b) => {
            const dateA = moment(a.date, 'DD/MM/YYYY, hh:mm:ss A');
            const dateB = moment(b.date, 'DD/MM/YYYY, hh:mm:ss A');
            return dateA - dateB;
        });
        res.status(200).send({ isAdmin: isAdmin ? isAdmin.isAdmin : false, result: result });
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
}

function getRandomInt(min, max) {
    const buffer = crypto.randomBytes(4);
    const randomNumber = buffer.readUInt32LE(0);
    return Math.floor(randomNumber / 0xFFFFFFFF * (max - min + 1) + min);
}