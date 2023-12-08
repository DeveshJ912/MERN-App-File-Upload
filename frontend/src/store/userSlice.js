import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { post, postWith200Check } from "../config/apiService";
import { UrlProvider } from "../config/urlProvider";
import { toast } from "react-toastify";

const initialState = {
    loggedIn:false,
    user:{
      name:'',
      username:'',
      email:'',
      id:'',
      profileImage:''
    },
    loading:false
};

export const verifyUser = createAsyncThunk(
    'verifyUser',
    async (data, thunkAPI) => {
      try {
        const response = await post(UrlProvider.signIn,data);
        return response;
      } catch (error){
        // toast.error(error.response.data.message)
        thunkAPI.dispatch(setLoader(false))
        return thunkAPI.rejectWithValue(error)
      }
    }
  )

  export const registerUser = createAsyncThunk(
    'registerUser',
    async (data, thunkAPI) => {
      try {
        const response = await post(UrlProvider.registerUser,data);
        return response;
      } catch (error){
        // toast.error(error.response.data.message)
        thunkAPI.dispatch(setLoader(false))
        return thunkAPI.rejectWithValue(error)
      }
    }
  )

export const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
      setProfileImage:(state,action)=>{
        state.user.profileImage=action.payload;
      },
      resetState:(state,action)=>{
        state.loggedIn=false;
        state.user = {
          name:'',
          username:'',
          email:'',
          id:'',
          profileImage:''
        };
        state.loading=false;
      },
      setLoader:(state,action)=>{
        state.loading = action.payload;
      }
    },

    extraReducers: (builder) => {
        builder.addCase(verifyUser.fulfilled, (state, action) => {
          state.loggedIn=true;
          state.loggedIn=true;
          state.user.name=action.payload.data.name;
          state.user.username=action.payload.data.username;
          state.user.email=action.payload.data.email;
          state.user.id=action.payload.data._id;
          state.user.profileImage=action.payload.data.profileImage;
        });
    
        builder.addCase(registerUser.fulfilled, (state, action) => {
        state.loggedIn=true;
        state.user.name=action.payload.data.name;
        state.user.username=action.payload.data.username;
        state.user.email=action.payload.data.email;
        state.user.id=action.payload.data._id;
        state.user.profileImage=action.payload.data.profileImage;
        });
      },
  });
  
  export const { setProfileImage, resetState,setLoader } = userSlice.actions;
  
  
  export default userSlice.reducer;