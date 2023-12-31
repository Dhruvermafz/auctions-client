const changeAvatar = createAsyncThunk(
  "profile/changeAvatar",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await http.patch("/profile/changeAvatar", {
        avatar: payload.avatar,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

const initialChangeAvatarState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const changeAvatarSlice = createSlice({
  name: "profile/changeAvatar",
  initialState: initialChangeAvatarState,
  reducers: {
    resetChangeAvatar() {
      return initialChangeAvatarState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeAvatar.pending, (avatarChange, action) => {
      avatarChange.loading = true;
      avatarChange.error = null;
    });
    builder.addCase(changeAvatar.fulfilled, (avatarChange, action) => {
      avatarChange.loading = false;
      avatarChange.success = true;
      avatarChange.data = action.payload.data;
    });
    builder.addCase(changeAvatar.rejected, (avatarChange, action) => {
      avatarChange.loading = false;
      avatarChange.success = false;
      avatarChange.error = action.payload;
    });
  },
});
