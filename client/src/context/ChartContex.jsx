import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/service";
import { io } from "socket.io-client";

export const ChartContext = createContext();
// baseUrl

export const ChartContextProvider = ({ children, user }) => {
  const [userCharts, setUserCharts] = useState(null);
  const [chartError, setChartError] = useState(null);
  const [chartLoading, setChartLoading] = useState(false);

  const [potentialChats, setPotentialChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [massage, setMassage] = useState(null);
  const [isMassageLoading, setIsMassageLoading] = useState(false);
  const [massageError, setMassageError] = useState(null);
  
  const [sendMassageError, setSendMassageError] = useState(null);

  const [newMassage, setNewMassage] = useState(null);
  const [socket, setSocket] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  console.log(onlineUsers, "onlineUsers", notifications , );

  useEffect(() => {
 
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlineusers", (res) => {
      setOnlineUsers(res);
    });
    return () => {
      socket.off("getOnlineusers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;
    const recipcentId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMassage, recipcentId });
  }, [newMassage]);


  useEffect(() => {
    if (socket === null) return;
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chartId) return;
      setMassage((prev) => [...prev, res]);
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChat.members.some((id) => id === res.senderId);
      if (isChatOpen) {
        setNotifications((prev)=> [{...res , isRead :true} , ...prev])
        
      }else{
        setNotifications((prev) => [res , ...prev])
      }
    });
    return () => {
      socket.off("getMessage");
      socket.off("getNotification");

    };
  }, [socket, currentChat]);


  useEffect(() => {
    const getUsers = async () => {
      const res = await getRequest(`${baseUrl}/users`);

      if (res.error) {
        console.log("there is something  error");
      }

      const pCharts = res?.filter((u) => {
        let isChartCreted = false;
        if (user?._id === u?._id) return false;
        if (userCharts) {
          isChartCreted = userCharts?.some((chat) => {
            return chat?.members[0] === u?._id || chat?.members[1] === u?._id;
          });
        }
        return !isChartCreted;
      });
      setPotentialChats(pCharts);
      setAllUsers(res)
    };
    getUsers();
  }, [userCharts]);

  useEffect(() => {
    const getUserCharts = async () => {
      if (user?._id) {
        setChartLoading(true);
        setChartError(null);
        const res = await getRequest(`${baseUrl}/charts/${user?._id}`);
        setChartLoading(false);

        if (res.error) {
          setChartError(res);
        }
        setUserCharts(res);
      }
    };

    getUserCharts();
  }, [user]);

  useEffect(() => {
    const getMassages = async () => {
      // if (user?._id) {
      setIsMassageLoading(true);
      setMassageError(null);
      const res = await getRequest(`${baseUrl}/massages/${currentChat?._id}`);

      if (res.error) {
        setMassageError(res);
      }
      setMassage(res);
      // }
    };

    getMassages();
  }, [currentChat]);

  const sendTextMassage = useCallback(
    async (textMassage, sender, currentChatId, setTextMassage) => {
      if (!textMassage) return console.log("Please input something....");
      const response = await postRequest(
        `${baseUrl}/massages`,
        JSON.stringify({
          chartId: currentChatId,
          senderId: sender,
          text: textMassage,
        })
      );
      if (response.error) return setSendMassageError(response);
      setNewMassage(response);
      setMassage((prev) => [...prev, response]);
      setTextMassage("");
    },
    []
  );
  const updateChat = useCallback(async (chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secoundId) => {
    const response = await postRequest(
      `${baseUrl}/charts`,
      JSON.stringify({ firstId, secoundId })
    );

    if (response.error) {
      return console.log("Something went Wrong ");
    }
    setUserCharts((prev) => [...prev, response]);
  }, []);

  const markAllRead = useCallback((notifiaction) => {
    const readNotifications = notifiaction?.map((n) => {
      return {
        ...n, isRead: true
      },
        setNotifications(readNotifications)
    })
  }, [])
  const markAsNotifction= useCallback(( n , userCharts , user , notifications)=>{
    const desireChat = userCharts?.find((chat)=>{
      const chatMembers = [user?._id , n.senderId];
      const isDesiredChat = chat?.members?.every((member)=>{
        return chatMembers.includes(member)
      });
      return isDesiredChat
    })

    const mNotifications = notifications?.map((el)=>{
      if(n.secoundId ===el?.secoundId){
        return {...n , isRead :true}
      }else{
        return el
      }
    }) 
    updateChat(desireChat)
    setNotifications(mNotifications)
  },[])

  return (
    <ChartContext.Provider
      value={{
        userCharts,
        chartError,
        chartLoading,
        potentialChats,
        createChat,
        updateChat,
        massage,
        isMassageLoading,
        massageError,
        currentChat,
        sendTextMassage,
        sendMassageError,
        newMassage,
        onlineUsers,
        notifications,
        allUsers,
        markAllRead,
        markAsNotifction
      }}
    >
      {children}
    </ChartContext.Provider>
  );
};
