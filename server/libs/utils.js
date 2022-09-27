export const deleteEl = (ArrayField, id) => {
  return ArrayField.splice(ArrayField.indexOf(id), 1);
};

export const mutateVote = (data) => {
  const {
    votedState: { voted, type },
    action,
    resource,
    userId,
  } = data;
  const upvotes = resource.meta.upvotes;
  const downvotes = resource.meta.downvotes;
  if (action == "up") {
    if (!voted) {
      upvotes.push(userId);
    } else {
      if (type == "up") {
        deleteEl(upvotes, userId);
      } else {
        deleteEl(downvotes, userId);
        upvotes.push(userId);
      }
    }
  } else if (action == "down") {
    if (!voted) {
      downvotes.push(userId);
    } else {
      if (type == "down") {
        deleteEl(downvotes, userId);
      } else {
        deleteEl(upvotes, userId);
        downvotes.push(userId);
      }
    }
  }
};

export const getIsUserVoted = (post, userId) => {
  const isUpvoted = post.meta.upvotes.indexOf(userId) === -1 ? false : true;
  const isDownvoted = post.meta.downvotes.indexOf(userId) === -1 ? false : true;

  return { isUpvoted, isDownvoted };
};

export const paginatePosts = (posts, offset, currentIdx, length) => {
  let hasMore;
  const startIdx = offset * currentIdx;
  const endIdx = startIdx + offset;
  const maxIdx = Math.ceil(length / offset);
  const currentPosts = posts.slice(startIdx, endIdx);
  console.log(currentPosts);
  return { currentPosts, maxIdx, hasMore: length > endIdx };
};
