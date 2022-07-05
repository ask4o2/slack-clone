import { Button } from '@mui/material'
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import React, { useRef } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components'
import { auth, db, } from './firebase';

function ChatInput({ channelName, channelId, chatRef }) {
    const [user, loading] = useAuthState(auth)

    const inputRef = useRef(null);
    const sendMessage = (e) => {
        e.preventDefault();

        if (!channelId) {
            return false;
        }

        // add message to collection
        const messagesRef = collection(db, `rooms/${channelId}/messages`);
        addDoc(messagesRef, {
            message: inputRef.current.value,
            timestamp: serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
        })

        inputRef.current.value = " ";

        chatRef?.current?.scrollIntoView({ behavior: 'smooth' })

    }
    return (
        <ChatInputContainer>
            <form >
                <input ref={inputRef} placeholder={`Message  #${channelName}`} />
                <Button hidden type='submit' onClick={sendMessage}>
                    SEND
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
    border-radius: 20px;

    > form {
        position: relative;
        justify-content: center;
        display: flex;
    }

    > form > input {
        position: fixed;
        bottom: 30px;
        width: 60%;
        border: 1px solid gray;
        border-radius: 3px;
        padding: 20px;
        outline: none;
    }

    > form > button {
        display: none !important;
    }
`