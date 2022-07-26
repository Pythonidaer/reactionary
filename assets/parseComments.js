import { displayCommentsUI } from "./displayCommentsUI.js";

export const parseComments = (fetchCommentsResponses) => {
  const allComments = [];

  fetchCommentsResponses.forEach((response) => {
    allComments.push(...response[1].data.children);
  });

  fetchCommentsResponses.length = 0;

  const commentsForPost = {};

  allComments.forEach(
    ({ data: { author, body, permalink, ups, created_utc, subreddit } }) => {
      commentsForPost[author] = !commentsForPost[author]
        ? { body, permalink, ups, subreddit, created_utc }
        : { body, permalink, ups, subreddit, created_utc };
    }
  );

  const commentList = Object.keys(commentsForPost).map((author) => ({
    author,
    body: commentsForPost[author].body,
    permalink: commentsForPost[author].permalink,
    ups: commentsForPost[author].ups,
    subreddit: commentsForPost[author].subreddit,
    created_utc: commentsForPost[author].created_utc,
  }));

  displayCommentsUI(commentList);
};
