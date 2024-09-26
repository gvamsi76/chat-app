import React, { useContext, useState } from "react";
import { ChartContext } from "../../context/ChartContex";
import { AuthContext } from "../../context/AuthContex";
import { unreadNotifications } from "../../utils/unreadNotifications";
import moment from "moment"

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, userCharts, allUsers, markAllRead, markAsNotifction } = useContext(ChartContext);
  const { user } = useContext(AuthContext)

  const unread = unreadNotifications(notifications)

  const modifyNotications = notifications?.map((user) => {
    const sender = allUsers.find((item) => item?._id === user?.senderId)
    return {
      ...user,
      senderName: sender?.name
    }
  })
  console.log(modifyNotications, "modifyNotications", unread, notifications)
  return (
    <div className="notifications">
      <div className="notifications-icon" onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chat-left-fill"
          viewBox="0 0 16 16"
        >
          <path d="M2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
        </svg>
        {unread?.length > 0 ? null : (
          <span className="notification-count">
            <span>{unread?.length}</span>
          </span>
        )}
      </div>
      {isOpen && (
        <div className="notifications-box">
          <div className="notifications-header">
            <h5>Notifications</h5>

            <div className="mark-as-read" onClick={() => markAllRead(notifications)}>mark ass all read</div>{" "}
          </div>
          {modifyNotications?.length === 0 ? <span className="notification"> No Notification Yet..</span> : null}
          {modifyNotications?.map((item) => {
            return (
              <div className={item?.isRead ? "notification " : "notification not-read"} onClick={() => {
                markAsNotifction(item, userCharts, user, notifications)
                setIsOpen(false)
              }}>
                <span>
                  {`${item?.senderName} sent a new message`}
                </span>
                <span className="notification-time">
                  {moment(item?.date).calendar()}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default Notification;
