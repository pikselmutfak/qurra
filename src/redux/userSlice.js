import {
    createSlice
} from '@reduxjs/toolkit'

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

export default userSlice.reducer