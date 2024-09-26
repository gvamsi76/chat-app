import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContex";
import { ChartContext } from "../../context/ChartContex";
import useFetchRecepinentUser from "../../hooks/useFetch";
import { Stack } from "react-bootstrap";
import InputEmoji from "react-input-emoji";

function ChatBox() {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    massage,
    isMassageLoading,
    sendTextMassage,
    newMassage,
    sendMassageError,
  } = useContext(ChartContext);
  const { recepinentUser } = useFetchRecepinentUser(currentChat, user);

  const [textMassage, setTextMassage] = useState("");
  const scrol = useRef();

  useEffect(() => {
    scrol.current?.scrollIntoView({ behavior: "smooth" });
  }, [massage]);

  if (!user) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
     loading User....
      </p>
    );
  }
  if (!recepinentUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No Conversation selected yet....
      </p>
    );
  }
  if (!isMassageLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading Chat .....</p>
    );
  }

  return (
    <Stack className="chat-box" gap={4}>
      <div className="chat-header">
        <strong> {recepinentUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {massage &&
          massage?.map((item) => {
            const date = new Date(item.createdAt);
            var date1 =
              date.toLocaleDateString() +
              " " +
              date
                .toTimeString()
                .substring(0, date.toTimeString().indexOf("GMT"));
            return (
              <Stack
                key={item?._id}
                className={`${
                  item?.senderId === user?._id
                    ? "message align-self-end flex-grow-0"
                    : "message align-self-start flex-grow-0"
                } `}
                ref={scrol}
              >
                <span> {item?.text} </span>
                <span className="message-footer"> {date1} </span>
              </Stack>
            );
          })}
      </Stack>
      <Stack direction="horizantal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji
          value={textMassage}
          onChange={setTextMassage}
          fontFamily="Fredoka"
          borderColor="rgba(72, 112, 223, 0.2)"
        />

        <button
          className="send-btn"
          onClick={() =>
            sendTextMassage(textMassage, user, currentChat?._id, setTextMassage)
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </button>
      </Stack>
    </Stack>
  );
}

export default ChatBox;
