import React, { useState, useEffect } from "react";
import axios from 'axios';
import moment from 'moment'
import Avatar from "../assets/avatar.svg";
import { jwtDecode } from 'jwt-decode'
import { Modal } from 'antd'
import { SendOutlined, PlusCircleOutlined } from "@ant-design/icons";

const ChatPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [chats, setChats] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [type, setType] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [latestMessages, setLatestMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState([])
    const [memberId, setMemberId] = useState('');
    const [activeButton, setActiveButton] = useState('contact');
    const [groupName, setGroupName] = useState('');
    const [isMenuModalOpen, setMenuModalOpen] = useState(false)
    const [MemberList, setMembersList] = useState([]);


    const formattedDate = (date) => {
        return moment(date, 'DD/MM/YYYY, hh:mm:ss A').format('DD/MM/YYYY | hh:mm A');
    };

    const addContactModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setMenuModalOpen(false)
    };

    const addContact = async () => {
        const data = { name: contactName, phoneNo: phoneNumber }
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-contact`, { data }, {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
        setContactName('');
        setPhoneNumber('');
        handleCancel();
    };

    const createGroup = async () => {
        try {
            const data = { Groupname: groupName };
            await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/create-group`, { data }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            })
            setGroupName('')
            handleCancel();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const result = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/getChatList`, {
                    headers: {
                        "Authorization": token
                    }
                });
                setChats(result.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const sendMessage = async (e) => {
        e.preventDefault();
        const data = { memberId: memberId, messageText: messageText };
        if (type === 'one') {
            await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-message`, { data }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
        }
        else if (type === 'many') {
            await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-message-to-group`, { data }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
        }
        await fetchChat(memberId)
        setMessageText('')
    };

    const chatClick = async (chatId, displayName, type) => {
        try {
            setType(type);
            await fetchChat(chatId)
            setDisplayName(displayName);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (memberId && type) {
            fetchChat(memberId);
        }
    }, [type, memberId]);

    async function fetchChat(chatId) {
        setMemberId(chatId);
        if (type === 'one') {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/get-chat`, {
                memberId: chatId
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            if (result) {
                const jsonData = JSON.stringify(result.data);
                localStorage.setItem(`${chatId}one`, jsonData);
                const data = JSON.parse(localStorage.getItem(`${chatId}one`));
                setMemberId(chatId);
                setSelectedChat(data);
            }
            else {
                setSelectedChat([]);
            }
        }
        else if (type === 'many') {
            const result = await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/get-chat-from-group`, {
                groupId: chatId
            }, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log(result)
            if (result) {
                const jsonData = JSON.stringify(result.data);
                localStorage.setItem(`${chatId}many`, jsonData);
                const data = JSON.parse(localStorage.getItem(`${chatId}many`));
                setMemberId(chatId);
                setSelectedChat(data);
            }
            else {
                setSelectedChat([]);
            }
        }
    }

    const opneMenuModel = () => {
        fetchMembers()
        setMenuModalOpen(true)
    }

    async function fetchMembers() {
        const token = localStorage.getItem('token');
        const result = await axios.get(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/getMembersList`, {
            headers: {
                "Authorization": token
            }
        });
        setMembersList(result.data);
    }

    const onAddMember = async (ListMemberId) => {
        const data = { memberId: ListMemberId, groupId: memberId };
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-group-member`, { data }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
    }

    const userId = localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).userid : null
    return (
        <>
            <div className="w-screen flex bg-sky-50">
                <div className="w-2/6 h-screen bg-sky-100">
                    <div className="border-b-2 py-4 px-2">
                        <input
                            type="text"
                            placeholder="Search for chat"
                            className="py-2 px-2.5 border-2 border-gray-200 rounded-2xl w-full bg-sky-50"
                        />
                    </div>
                    <div className="ml-5 mt-5 h-[73%] overflow-auto scrollbar-hide">
                        <div className="text-lg text-blue-500">Messages</div>
                        <div>
                            {chats.map(chat => {
                                const latestMessageInfo = latestMessages.find(item => item.chatId === chat.id);
                                return (
                                    <div className="flex item-center my-6 cursor-pointer" onClick={() => chatClick(chat.memberId, chat.name, chat.type)}>
                                        <div className="p-0.5 bg-sky-600 rounded-full w-10 h-10">
                                            {/* <img src={'../assets/avatar.svg'} alt="" width={40} height={40} /> */}
                                        </div>
                                        <div className="ml-5 flex items-center flex-col">
                                            <h3 className="text-lg">{chat.name}</h3>
                                            <p className="text-xs">{latestMessageInfo ? latestMessageInfo.message : ''}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <PlusCircleOutlined className="text-4xl p-2 cursor-pointer flex flex-row-reverse mr-5 text-sky-600" onClick={addContactModal} />

                    <Modal title={activeButton === 'contact' ? 'Add Contact' : 'Create Group'} open={isModalOpen} onCancel={handleCancel} footer={false}>
                        <div className="flex justify-around">
                            <button className={`flex w-[40%] justify-center rounded-md bg-sky-${activeButton === 'contact' ? '600' : '300'} px-3 mt-2 mb-4 py-1.5 text-${activeButton === 'contact' ? 'white' : 'black'}`} onClick={() => { setActiveButton('contact') }}>
                                Add Contact
                            </button>
                            <button className={`flex w-[40%] justify-center rounded-md bg-sky-${activeButton === 'group' ? '600' : '300'} px-3 mt-2 mb-4 py-1.5 text-${activeButton === 'group' ? 'white' : 'black'}`} onClick={() => { setActiveButton('group') }}>
                                Create Group
                            </button>
                        </div>
                        <form>
                            {activeButton === 'contact' && (
                                <div>
                                    <label htmlFor="contactName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="contactName"
                                            name="contactName"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                            value={contactName}
                                            onChange={(e) => setContactName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeButton === 'contact' && (
                                <div>
                                    <label htmlFor="phoneNo" className="block text-sm font-medium leading-6 text-gray-900 mt-2">
                                        Phone Number
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="phoneNo"
                                            name="phoneNo"
                                            type="number"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeButton === 'group' && (
                                <div>
                                    <label htmlFor="groupName" className="block text-sm font-medium leading-6 text-gray-900">
                                        Group Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="groupName"
                                            name="groupName"
                                            type="text"
                                            required
                                            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                                            value={groupName}
                                            onChange={(e) => setGroupName(e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {activeButton === 'contact' && (
                                <button type="button" className="flex w-full justify-center rounded-md bg-sky-500 px-3 mt-3 py-1.5 text-white" onClick={addContact}>
                                    Add Contact
                                </button>
                            )}

                            {activeButton === 'group' && (
                                <button type="button" className="flex w-full justify-center rounded-md bg-sky-500 px-3 mt-3 py-1.5 text-white" onClick={createGroup}>
                                    Create Group
                                </button>
                            )}
                        </form>
                    </Modal>
                </div>

                {selectedChat && (
                    <div className="w-4/6 h-screen flex flex-col items-center">
                        <div className="w-3/4 h-14 bg-sky-200 my-3 rounded-full flex items-center px-2 justify-between">
                            <img src={Avatar} alt="" width={40} height={40} />
                            <div className="ml-5 mr-3">
                                <h3 className="text-lg">{displayName}</h3>
                                {/* <p className='text-sm font-light text-gray-500'>online</p> */}
                            </div>
                            <div className="cursor-pointer" onClick={opneMenuModel}>
                                <i className="fa-solid fa-ellipsis-vertical mr-4"></i>
                            </div>
                        </div>

                        <Modal title="Member List" open={isMenuModalOpen} onCancel={handleCancel} footer={false}>
                            {MemberList.map((member, index) => (
                                <div className="flex justify-between mt-3">
                                    <p className="flex items-center" key={index}>{member.ContactName}</p>
                                    <button className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => onAddMember(member.memberId)}>
                                        Add
                                    </button>
                                </div>
                            ))}
                        </Modal>

                        <div className="h-3/4 w-full overflow-auto scrollbar-hide border-b">
                            {selectedChat.map((message, index) => (
                                (type === 'one' && (
                                    <div className="px-10 pt-5">
                                        <div key={index} className={`flex justify-${message.recipeintId === memberId ? 'end' : 'start'}`}>
                                            <div className={`max-w-[40%] bg-sky-${message.recipeintId === memberId ? '600' : '500'} rounded-b-xl rounded-${message.recipeintId === memberId ? 'tl-xl' : 'tr-xl'} p-4 mb-4 text-white`}>
                                                <p>
                                                    {message.messageText}
                                                </p>
                                                <p className="text-xs text-black float-right">
                                                    {formattedDate(message.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )) ||
                                (type === 'many' && (
                                    <div className="px-10 pt-5">
                                        <div key={index} className={`flex justify-${message.senderId === userId ? 'end' : 'start'}`}>
                                            <div className={`max-w-[40%] bg-sky-${message.senderId === userId ? '600' : '500'} rounded-b-xl rounded-${message.senderId === userId ? 'tl-xl' : 'tr-xl'} p-4 mb-4 text-white`}>
                                                <p>
                                                    {message.messageText}
                                                </p>
                                                <p className="text-xs text-black float-right">
                                                    {formattedDate(message.date)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))}
                        </div>

                        <div className="p-3 w-full flex items-center">
                            <i className="fa-solid fa-paperclip text-lg ml-2 mr-5 cursor-pointer"></i>
                            <form className="flex w-full" onSubmit={sendMessage}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-11/12 px-3 py-3 border rounded shadow-md bg-sky-100 focus:outline-none"
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="mx-3 cursor-pointer bg-sky-100 hover:bg-sky-200 px-3 border rounded shadow-md"
                                >
                                    <SendOutlined className="text-3xl mt-1" />
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </>
    );
};

export default ChatPage;
