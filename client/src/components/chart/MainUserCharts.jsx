import React, { useContext } from 'react'
import useFetchRecepinentUser from '../../hooks/useFetch'
import { Stack } from 'react-bootstrap';
import userIcon from '../../assets/undraw.svg'
import { ChartContext } from '../../context/ChartContex';
import { unreadNotifications } from '../../utils/unreadNotifications';


function MainUserCharts({ chat, user }) {

    const { recepinentUser } = useFetchRecepinentUser(chat, user)
    const { onlineUsers , notifications } = useContext(ChartContext)
  const unread = unreadNotifications(notifications)
  const thisUserNotifications = unread.filter((n)=> n.senderId == recepinentUser?._id)

    const isOnline = onlineUsers?.some((item) => item?.userId === recepinentUser?._id)


    return (
        <>
            <Stack direction="horizontal" gap={3} className="user-card algin-items-center p-2 justify-content-between" role='button'>
                <div className="d-flex">
                    <div className="me-2">
                        <img src={userIcon} with={"30px"} height={"50px"} />
                    </div>
                    <div className="text-content">
                        <div className="name">
                            {recepinentUser?.name}
                        </div>
                        <div className="tex">Text Massage</div>

                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className='date'>22/02/2024</div>
                    <div className={thisUserNotifications?.length > 0 ?   "this-user-notifications" : ""}>{thisUserNotifications?.length > 0  ?  thisUserNotifications?.length : ""}</div>
                    <span className={isOnline ? "user-online " : ""}> </span>

                </div>
            </Stack>
        </>
    )
}

export default MainUserCharts