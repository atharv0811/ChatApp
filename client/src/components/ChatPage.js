import React, { useState, useEffect } from "react";
import axios from 'axios';
import Avatar from "../assets/avatar.svg";
import { Modal } from 'antd'
import { SendOutlined, PlusCircleOutlined } from "@ant-design/icons";

const ChatPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [chats, setChats] = useState([]);
    const [messageText, setMessageText] = useState('');
    const [type, setType] = useState('');
    const [latestMessages, setLatestMessages] = useState([]);
    const [memberId, setMemberId] = useState('');

    // const contacts = [
    //     {
    //         name: "Atharv",
    //         img: Avatar,
    //     },
    // ];

    const addContactModal = () => {
        setIsModalOpen(true);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
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
    };

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

    const sendMessage = async () => {
        const data = { messageText: messageText };
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST_NAME}/chat/add-message`, { data }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });

    };

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
                            {/* {contacts.map(({ name, img }) => {
                                return (
                                    <div className="flex item-center my-6">
                                        <div className="p-0.5">
                                            <img src={img} alt="" width={40} height={40} />
                                        </div>
                                        <div className="ml-5 flex items-center">
                                            <h3 className="text-lg">{name}</h3>
                                        </div>
                                    </div>
                                );
                            })} */}
                            {chats.map(chat => {
                                const latestMessageInfo = latestMessages.find(item => item.chatId === chat.id);
                                return (
                                    <div className="flex item-center my-6 cursor-pointer">
                                        <div className="p-0.5 bg-sky-600 rounded-full w-10 h-10">
                                            {/* <img src={'../assets/avatar.svg'} alt="" width={40} height={40} /> */}
                                        </div>
                                        <div className="ml-5 flex items-center flex-col">
                                            <h3 className="text-lg">{chat.name}</h3>
                                            <p className="text-xs">{latestMessageInfo ? latestMessageInfo.message : 'No messages yet'}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <PlusCircleOutlined className="text-4xl p-2 cursor-pointer flex flex-row-reverse mr-5" onClick={addContactModal} />
                    <Modal title="Add Contact" open={isModalOpen} onCancel={handleCancel} footer={false}>
                        <form onSubmit={addContact}>
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

                            <button type="submit" className="flex w-full justify-center rounded-md bg-sky-500 px-3 mt-3 py-1.5 text-white">Add</button>
                        </form>
                    </Modal>
                </div>

                <div className="w-4/6 h-screen flex flex-col items-center">
                    <div className="w-3/4 h-14 bg-sky-100 my-3 rounded-full flex items-center px-2">
                        <img src={Avatar} alt="" width={40} height={40} />
                        <div className="ml-5">
                            <h3 className="text-lg">Name</h3>
                            {/* <p className='text-sm font-light text-gray-500'>online</p> */}
                        </div>
                    </div>
                    <div className="h-3/4 w-full overflow-auto scrollbar-hide border-b">
                        <div className="px-10 pt-8 pb-5">
                            <div className='flex justify-end'>
                                <div className="max-w-[40%] bg-sky-600 rounded-b-xl rounded-tl-xl p-4 mb-4 text-white">
                                    hii
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="max-w-[40%] bg-sky-300 rounded-b-xl rounded-tr-xl p-4 mb-4">
                                    Hello
                                </div>
                            </div>
                        </div>
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

            </div>
        </>
    );
};

export default ChatPage;
