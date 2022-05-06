export const mutateVote = (votedState, action, resource, userId) => {
  const { voted, type } = votedState;
  if (action == "up") {
    if (!voted) {
      resource.meta.upvotes.push(userId);
    } else {
      if (type == "up") {
        resource.meta.upvotes.splice(resource.meta.upvotes.indexOf(userId), 1);
      } else {
        resource.meta.downvotes.splice(
          resource.meta.downvotes.indexOf(userId, 1)
        );
        resource.meta.upvotes.push(userId);
      }
    }
  } else if (action == "down") {
    if (!voted) {
      resource.meta.downvotes.push(userId);
    } else {
      if (type == "down") {
        resource.meta.downvotes.splice(
          resource.meta.downvotes.indexOf(userId),
          1
        );
      } else {
        resource.meta.upvotes.splice(resource.meta.upvotes.indexOf(userId, 1));
        resource.meta.downvotes.push(userId);
      }
    }
  }
};
