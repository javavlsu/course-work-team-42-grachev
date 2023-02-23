import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ReduxUserTypes = {
  login: string | undefined;
  role: string | undefined;
};

const initialState: ReduxUserTypes = {
  login: undefined,
  role: undefined,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      action: PayloadAction<ReduxUserTypes>
    ) {
      Object.assign(state, action.payload);
      document.cookie = `role=${action.payload.role};`;
      document.cookie = `login=${action.payload.login};`;
    },
    dropUser(
      state
    ) {
      Object.assign(state, initialState);
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
      localStorage.removeItem("login");
    }
  },
});

export const {setUser, dropUser} = userSlice.actions;

export default userSlice.reducer;