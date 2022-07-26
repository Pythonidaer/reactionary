import { displayPostsUI } from "./displayPostsUI.js";

export const parseResults = (fetchPostsResponses) => {
  const allPosts = [];

  fetchPostsResponses.forEach((response) => {
    // console.log(response);

    allPosts.push(...response.data.children);
  });

  fetchPostsResponses.length = 0;
  // console.log("allPosts:", allPosts);

  const postsByUser = {};

  allPosts.forEach(
    ({
      data: { author, title, permalink, created_utc, num_comments, ups },
    }) => {
      postsByUser[author] = !postsByUser[author]
        ? { title, permalink, created_utc, num_comments, ups }
        : {
            title,
            permalink,
            created_utc,
            num_comments,
            ups,
          };
    }
  );

  const userList = Object.keys(postsByUser).map((author) => ({
    author,
    title: postsByUser[author].title,
    permalink: postsByUser[author].permalink,
    created_utc: postsByUser[author].created_utc,
    num_comments: postsByUser[author].num_comments,
    ups: postsByUser[author].ups,
  }));

  displayPostsUI(userList);
};
