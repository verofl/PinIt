const CREATE_COMMENT = "comments/CREATE_COMMENT";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";

const createComment = (comment) => ({
  type: CREATE_COMMENT,
  comment,
});

const editComment = (comment) => ({
  type: EDIT_COMMENT,
  comment,
});

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId,
});

// Create a new comment
export const postNewCommentThunk = (pin_id, comment) => async (dispatch) => {
  try {
    const res = await fetch(`/api/pins/${pin_id}/comments/new`, {
      method: "POST",
      body: comment,
    });
    const data = await res.json();

    if (!res.ok) return { errors: data };

    await dispatch(createComment(data));
    return data;
  } catch (error) {
    console.error("Failed to create a comment :", error);
    return { errors: error.message };
  }
};

// Edit a comment
export const updateCommentThunk = (comment_id, comment) => async (dispatch) => {
  try {
    const res = await fetch(`/api/comments/${comment_id}`, {
      method: "PUT",
      body: comment,
    });

    const data = await res.json();

    if (!res.ok) {
      return { errors: data };
    }

    await dispatch(editComment(data));
    return data;
  } catch (error) {
    console.error("Failed to update the comment:", error);
    return { errors: error.message };
  }
};

// Delete a comment
export const deleteCommentThunk = (comment_id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/comments/${comment_id}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!res.ok) {
      return { errors: data };
    }

    await dispatch(deleteComment(comment_id));
  } catch (error) {
    console.error("Failed to delete comment:", error);
    return { errors: error.message };
  }
};

function commentReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_COMMENT: {
      const newState = { ...state };
      newState[action.comment.id] = action.comment;
      return newState;
    }
    case EDIT_COMMENT: {
      return {
        ...state,
        [action.comment.id]: action.comment,
      };
    }
    case DELETE_COMMENT: {
      const newState = { ...state };
      delete newState[action.commentId];
      return newState;
    }
    default:
      return state;
  }
}

export default commentReducer;
