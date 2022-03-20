import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import { UserOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons'

export default function({ children, post }) {

    console.log(post)
    const { user, content } = post

    return (
        <div className='flex flex-col w-full sm:rounded-lg bg-white border border-solid p-4 pb-1 border-gray-300'>
                
            <div className='flex gap-2 items-center'>
                <Avatar size='large' icon={<UserOutlined />} />
                <div className='flex justify-between'>
                    <div className='flex flex-col leading-3'>
                        <span className='font-bold'>{ user.name} </span>
                        <span className='text-sm'>2 hours ago</span>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                 { content }
            </div>

            <div>
                1 Like
            </div>

            <div className='flex gap-2 text-lg py-1 border-t border-gray-300'>
                <button  className='cursor-pointer flex-grow py-1 bg-white hover:bg-gray-100 rounded-full'>
                    <LikeOutlined />
                </button>
                <Link to='/posts/1' className='flex-grow py-1 text-center bg-white hover:bg-gray-100 rounded-full'><CommentOutlined /></Link>
            </div>

            {
                !!children && (
                    <div className='mt-1 mb-4 border-t border-gray-300'>
                        { children }
                    </div>
                )
            }

        </div>
    )
}