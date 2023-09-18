import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
    list: [{
        firstName: "Redux",
        lastName: "Demo",
        age: 42
    }],
    xauth: undefined,
    profile: undefined
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        add: (state, action) => {
            console.log('anlık state', state)
            console.log('kullanıcı içeriği', action)
        },
        // setAll: (state, action) => {
        //     console.log('setAll içeriği', action.payload)
        // },
        setAll: (state, {payload}) => {
            console.log('setAll içeriği', payload)
            // return payload

            state.list = payload
        },
        setXAuth: (state, {payload}) => {
            console.log('xauth payload', payload)
            state.xauth = payload
        },
        setProfile: (state, {payload}) => {
            state.profile = payload
        }
    }
})

export const {add, setAll, setXAuth, setProfile} = userSlice.actions

export const getUsers = createAsyncThunk('getUsers', async (info, { getState, dispatch }) => {

    console.log('thunk params', info)

    const {
        callback
    } = info

    const url = '/api/users'
    axios.get(url)
    .then((response) => {
        console.log('thunk get all', response.data)

        dispatch(
            setAll(
                response.data
            )
        )
        callback(true)
    })
    .catch((err) => {
        console.log('error', err)
        callback(false)
    })
})

export const signIn = createAsyncThunk('signIn', async (info, { getState, dispatch }) => {

    console.log('thunk params', info)

    const {
        callback,
        email,
        password
    } = info

    const url = '/api/signin'
    axios.post(url, {
        email,
        password
    })
    .then((response) => {

        const xauth = response.headers.xauth
        const profile = response.data

        dispatch(
            setXAuth(
                xauth
            )
        )

        dispatch(
            setProfile(
                profile
            )
        )

        callback(true)
    })
    .catch((err) => {
        console.log('error', err)
        callback(false)
    })
})

export default userSlice.reducer