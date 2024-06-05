const LOAD_USERS = "users/LOAD_USERS";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

// Load ALL Users
export const loadUsersThunk = () => async (dispatch) => {
  const res = await fetch("/api/users/list");
  const data = await res.json();
  // console.log("USER DATA", data);

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadUsers(data));
  return data;
};

function userReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_USERS: {
      const newState = {};
      action.users.users.forEach((eachUser) => {
        newState[eachUser.id] = eachUser;
      });
      return newState;
    }
    default:
      return state;
  }
}
export default userReducer;
