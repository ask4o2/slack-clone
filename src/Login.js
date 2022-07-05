import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import styled from 'styled-components'
import { auth, provider } from './firebase'

function Login() {
    const signIn = () => {
        signInWithPopup(auth, provider)
            .then(userAuth => {
                console.log('signed success')
            })
            .catch(err => alert(err.message))
    }
    return (
        <LoginContainer>
            <LoginInnerConatiner>
                <img src="https://yt3.ggpht.com/ytc/AKedOLS2OOXtmIHu0Tf1TmWITVrHNktn-MVXK3XRjwf4YA=s900-c-k-c0x00ffffff-no-rj" alt="" />
                <h1>Sign in to GDG_ MAID</h1>
                <p>gdgmaiduguri.slack.com</p>

                <Button onClick={signIn}>Sign in with Google</Button>
            </LoginInnerConatiner>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled.div`
    display: grid;
    place-items: center;
    background-color: #f8f8f8;
    height: 100vh;
`

const LoginInnerConatiner = styled.div`
    padding: 100px;
    text-align: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.12);

    > img {
        object-fit: contain;
        height: 100px;
        margin-bottom: 40px ;
    }

    > button {
        margin-top: 50px;
        text-transform: inherit !important;
        background-color: #0a8d48 !important;
        color: white;
        cursor: pointer;
    }
`