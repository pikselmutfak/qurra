import * as userSlice from './userSlice'

import {
    store
} from './store'


export const getMe = (info) => store.dispatch(userSlice.getMe(info))
export const signIn = (info) => store.dispatch(userSlice.signIn(info))
export const generateQR = (info) => store.dispatch(userSlice.generateQR(info))
export const getMyCodes = (info) => store.dispatch(userSlice.getMyCodes(info))