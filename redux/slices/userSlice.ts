import { User } from '@/lib/interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export const initialState: User = {
    uid: null,
    email: null,
    username: null,
    imageUrl:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.username = action.payload.username;
            state.imageUrl = action.payload.imageUrl;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
