import * as userSlice from './userSlice'

import {
    store
} from './store'


export const getUsers = (info) => store.dispatch(userSlice.getUsers(info))
export const signIn = (info) => store.dispatch(userSlice.signIn(info))