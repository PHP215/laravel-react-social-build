import { useEffect } from 'react'
import { Avatar, Badge, Card } from 'antd'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import useUser from '@/js/recoil/selectors/useUser'
import { useApi } from '@/js/hooks'
import { fetchUser } from '@/js/apis/UserApi'
import useUsersAction from '@/js/recoil/actions/useUsersAction'
import ProfileSkeleton from './components/Skeleton'
import FollowButton from '../FollowButton'
import useUserFollowingIds from '@/js/recoil/selectors/useUserFollowings'
import useUserFollowerIds from '@/js/recoil/selectors/useUserFollowerIds'
import { useIsCurrentUserFollower } from '@/js/recoil/selectors/currentUserSelector'

export default () => {
    const { execute, isSuccess, data } = useApi(fetchUser)
    const { setUser } = useUsersAction()
    const { id } = useParams()
    const followingIds = useUserFollowingIds(id)
    const followerIds = useUserFollowerIds(id)
    const isCurrentUserFollower = useIsCurrentUserFollower(id)
    const user = useUser(id)

    useEffect(() => {
        if (isSuccess) {
            setUser(data)
        }
    }, [isSuccess])

    useEffect(() => {
        execute(id)
    },[id])

    if (!user) return <ProfileSkeleton/>

    return (
        <>
            <div className='h-60 lg:h-80 bg-gray-500 relative'>
                <img className='w-full h-full object-cover' src='https://source.unsplash.com/oDhGIbegZNI/1400x900' />
            </div>

            <div className='max-w-5xl mx-auto -translate-y-28'>

                <div className='flex flex-col items-center lg:items-end gap-4 lg:flex-row translate'>
                    <div>
                        <Avatar className='border-2 border-white' size={224} src={user.avatar} />
                    </div>
                    <div className='flex flex-col gap-2 w-full'>
                        <div className='flex flex-col items-center justify-between lg:flex-row'>
                            <div className='flex items-end gap-1'>
                                <div className='text-3xl font-bold text-gray-800'>{user.name}</div>
                                {isCurrentUserFollower && <Badge style={{backgroundColor: 'rgb(75 85 99 / var(--tw-bg-opacity))'}} count='Follows you'/>}
                            </div>
                            <div>
                                <FollowButton size='large' userId={user.id}/>
                            </div>
                        </div>
                        <div className='profile-navlinks'>
                            <NavLink to={`/profile/${id}`} end className='profile-navlinks-item'>Post</NavLink>
                            <NavLink to={`/profile/${id}/about`} className='profile-navlinks-item'>About</NavLink>
                            <NavLink to={`/profile/${id}/following`} className='profile-navlinks-item'>
                                <span className='text-blue-500'>{followingIds.length}</span> Following
                            </NavLink>
                            <NavLink to={`/profile/${id}/follower`} className='profile-navlinks-item'>
                                <span className='text-blue-500'>{followerIds.length}</span> Follower
                            </NavLink>
                        </div>
                    </div>
                </div>

                <div className='mt-8 grid grid-cols-4 gap-4'>
                    <div>
                        <Card>
                            lorem ipsum
                        </Card>
                    </div>

                    <div className='col-span-2'>
                        <Outlet/>
                    </div>


                </div>

            </div>
        </>
    )
}