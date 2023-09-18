import {
    Form
} from 'react-bootstrap'

import {
    useState,
    useEffect
} from 'react'

import Button from '../Button'

import axios from 'axios'

const SignUp = () => {

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        age: "",
        password: "",
        email: ""
    })

    useEffect(() => {
        // console.log('userinfo güncellendi', userInfo)
    }, [userInfo])

    const saveUser = () => {

        const url = '/api/signup'
        axios.post(url, userInfo)
        .then((response) => {
            console.log('signup response', response.data)
        })
        .catch((err) => {
            console.log('signup failed', err)
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
            <Form.Control placeholder="Ad" value={userInfo.firstName} onChange={(e) => {
                const firstName = e.target.value
                const newInfo = {...userInfo, firstName}
                setUserInfo(newInfo)
            }} />
            <Form.Control placeholder="Soyad" value={userInfo.lastName} onChange={(e) => {
                const lastName = e.target.value
                const newInfo = {...userInfo, lastName}
                setUserInfo(newInfo)
            }} />
            <Form.Control placeholder="Yaş" value={userInfo.age} onChange={(e) => {
                const age = e.target.value
                const newInfo = {...userInfo, age}
                setUserInfo(newInfo)
            }} />
            <Button title='Kaydet' onClick={() => {
                    console.log('user kaydedildi', userInfo)
                    saveUser()
                }}
            />
        </>
    )
}

export default SignUp