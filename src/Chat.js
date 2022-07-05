import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { StarBorderOutlined, InfoOutlined } from "@mui/icons-material"
import { useSelector } from "react-redux";
import { getRoomId } from "./features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";
import Message from "./Message";

function Chat() {
    const chatRef = useRef(null)
    const roomId = useSelector(getRoomId);
    const [roomDetails] = useDocument(roomId && doc(db, "rooms", roomId));
    const [roomMessages, loading] = useCollection(roomId && query(collection(db, `rooms/${roomId}/messages`,), orderBy('timestamp', 'asc')));

    useEffect(() => {
        chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roomId, loading])

    return (
        <ChatContainer>
            {roomDetails && roomMessages && (
                <>
                    <Header>
                        <HeaderLeft>
                            <h4>
                                <strong>#{roomDetails?.data().name}</strong>
                            </h4>
                            <StarBorderOutlined />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlined /> Details
                            </p>
                        </HeaderRight>
                    </Header>

                    <ChatMessages>
                        {roomMessages?.docs.map(msg => {
                            const { message, timestamp, user, userImage } = msg.data();
                            return <Message key={msg.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                        })}
                    </ChatMessages>

                    <ChatBottom ref={chatRef} />

                    <ChatInput chatRef={chatRef} channelId={roomId} channelName={roomDetails?.data().name} />
                </>
            )}


        </ChatContainer>
    )
}

export default Chat;

const ChatContainer = styled.div`
    flex: 0.7;
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 35px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1 solid lightgray;
`

const HeaderLeft = styled.div`
    display: flex;
    align-items: center;

    > h4 {
        display: flex;
        text-transform: lowercase;
        margin-right: 10px;
    }

    > h4 .MuiSvgicon-root {
        margin-left: 20px;
        font-size: 18px;
    }
`
const HeaderRight = styled.div`
    > p {
        display: flex;
        align-items: center;
        font-size: 14px;
    }

    > p > .MuiSvgicon-root {
        margin-right: 5px !important;
        font-size: 16px;
    }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
    padding-bottom: 200px;
`