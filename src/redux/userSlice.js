import {
    createSlice
} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: [{
        firstName: "Redux",
        lastName: "Demo",
        age: 42
    }],
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
            return payload
        }
    }
})

export const {add, setAll} = userSlice.actions

export default userSlice.reducer