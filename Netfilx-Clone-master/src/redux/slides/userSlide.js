import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cccd: '',
    phone: 0,
    address: '',
    name: '',
    email: '',
    access_token: '',
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const { cccd, phone, address, name,  email, access_token} = action.payload
            console.log('action',action)
            state.cccd = cccd ? cccd : state.cccd;
            state.phone = phone ? phone : state.phone;
            state.address = address ? address : state.address;
            state.name = name ? name : state.name;
            state.email = email ? email : state.email;
            state.access_token = access_token
        },
        resetUser: (state) => {
            state.name = '';
            state.email = '';
            state.access_token = ''
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlide.actions

export default userSlide.reducer