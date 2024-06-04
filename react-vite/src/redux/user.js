const LOAD_USERS = "pins/LOAD_USERS";

const loadUsers = (users) => ({
  type: LOAD_USERS,
  users,
});

// Load ALL Users
export const loadUsersThunk = () => async (dispatch) => {
  const res = await fetch("/api/users");
  const data = await res.json();

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
      action.users.forEach((eachUser) => {
        newState[eachUser.id] = eachUser;
      });
      return newState;
    }
    default:
      return state;
  }
}
export default userReducer;
