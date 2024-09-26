import React, { useContext } from 'react'
import { ChartContext } from '../../context/ChartContex'
import { AuthContext } from '../../context/AuthContex';

function PotentialCharts() {

    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChartContext)
    return (
        <>
            <div className="all-users">
                {potentialChats && potentialChats?.map((item) => {
                    return (
                        <div className="single-user" onClick={() => createChat(user?._id, item?._id)} key={item?._id}>
                            {item?.name}
                            <span className={`${onlineUsers?.some((chat) => chat.userId === item?._id) ?  "user-online " : ""}`}> </span>
                        </div>

            )
                })} 
        </div >
        </>
    )
}

export default PotentialCharts