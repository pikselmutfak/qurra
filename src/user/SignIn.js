import {
    Form
} from 'react-bootstrap'

import {
    useState,
    useEffect
} from 'react'

import Button from '../Button'

import axios from 'axios'

const SignIn = () => {

    const [userInfo, setUserInfo] = useState({
        password: "",
        email: ""
    })

    const signIn = () => {

        const url = '/api/signin'
        axios.post(url, userInfo)
        .then((response) => {
            console.log('signin response', response.data)
        })
        .catch((err) => {
            console.log('signin failed', err)
        })
    }

    return (
        <>
            <Form.Control type="email" placeholder="Email" value={userInfo.email} onChange={(e) => {
                const email = e.target.value
                const newInfo = {...userInfo, email}
                setUserInfo(newInfo)
            }} />
            <Form.Control type="password" placeholder='Password' security="true" value={userInfo.password} onChange={(e) => {
                const password = e.target.value
                const newInfo = {...userInfo, password}
                setUserInfo(newInfo)
            }} />
            <Button title='Giriş Yap' onClick={() => {
                    signIn()
                }}
            />
        </>
    )
}

export default SignIn