import React from 'react'
import Avatar from '../assets/avatar.svg'
import { SendOutlined } from '@ant-design/icons'

const ChatPage = () => {
    const contacts = [
        {
            name: 'Atharv',
            img: Avatar
        },
        {
            name: 'Anushka',
            img: Avatar
        },
        {
            name: 'Amey',
            img: Avatar
        },
        {
            name: 'Aditi',
            img: Avatar
        },
        {
            name: 'Avadhut',
            img: Avatar
        }
    ]

    return (
        <div className='w-screen flex bg-sky-50'>
            <div className='w-2/6 h-screen bg-sky-100'>
                <div className="border-b-2 py-4 px-2">
                    <input
                        type="text"
                        placeholder="Search for chat"
                        className="py-2 px-2.5 border-2 border-gray-200 rounded-2xl w-full bg-sky-50"
                    />
                </div>
                <div className='ml-5 mt-5 h-[73%] overflow-auto scrollbar-hide'>
                    <div className='text-lg text-blue-500'>Messages</div>
                    <div>
                        {
                            contacts.map(({ name, img }) => {
                                return (
                                    <div className='flex item-center my-6'>
                                        <div className='p-0.5'>
                                            <img src={img} alt="" width={40} height={40} />
                                        </div>
                                        <div className='ml-5 flex items-center'>
                                            <h3 className='text-lg'>{name}</h3>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            <div className='w-4/6 h-screen flex flex-col items-center'>
                <div className='w-3/4 h-14 bg-sky-100 my-3 rounded-full flex items-center px-2'>
                    <img src={Avatar} alt="" width={40} height={40} />
                    <div className='ml-5'>
                        <h3 className='text-lg'>Amey</h3>
                        <p className='text-sm font-light text-gray-500'>online</p>
                    </div>
                </div>
                <div className='h-3/4 w-full overflow-auto scrollbar-hide border-b'>
                    <div className='px-10 pt-8 pb-5'>
                        <div className='max-w-[40%] bg-sky-300 rounded-b-xl rounded-tr-xl p-4 mb-4'>
                            Hiii
                        </div>
                        <div className='max-w-[40%] bg-sky-600 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4 text-white'>
                            Hello asdkj asdlfj asdfj asdf asdfj asdfj asdf asdf asdf asd
                        </div>
                        <div className='max-w-[40%] bg-sky-300 rounded-b-xl rounded-tr-xl p-4 mb-4'>
                            Hiii
                        </div>
                        <div className='max-w-[40%] bg-sky-600 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4 text-white'>
                            Hello asdkj asdlfj asdfj asdf asdfj asdfj asdf asdf asdf asd
                        </div>
                        <div className='max-w-[40%] bg-sky-300 rounded-b-xl rounded-tr-xl p-4 mb-4'>
                            Hiii
                        </div>
                        <div className='max-w-[40%] bg-sky-600 rounded-b-xl rounded-tl-xl ml-auto p-4 mb-4 text-white'>
                            Hello asdkj asdlfj asdfj asdf asdfj asdfj asdf asdf asdf asd
                        </div>
                    </div>
                </div>

                <div className='p-3 w-full flex items-center'>
                    <i class="fa-solid fa-paperclip text-lg ml-2 mr-5 cursor-pointer"></i>
                    <input type="text" placeholder='Type a message...' className='w-11/12 px-3 py-3 border rounded shadow-md bg-sky-100 focus:outline-none' />
                    <div className='mx-3 cursor-pointer bg-sky-100 px-3 border rounded shadow-md'>
                        <SendOutlined className='text-3xl mb-2' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage
