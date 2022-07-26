import { parseResults } from "./parseResults.js";

export const fetchPosts = async (subreddit) => {
  const fetchPostsResponses = [];

  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json?limit=1`
  );
  const responseJSON = await response.json();
  fetchPostsResponses.push(responseJSON);

  parseResults(fetchPostsResponses);
};
