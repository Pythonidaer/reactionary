// Where we store our responses from when fetchPosts is called
// since multiple fetches will be called in this app, I am renaming this to be a more specific type
const fetchPostsResponses = [];
const fetchCommentsResponses = [];

const afters = [];

const handleSubmit = (e) => {
  e.preventDefault();
  const subreddit = document.getElementById("subreddit").value;
  fetchPosts(subreddit);
};

const fetchPosts = async (subreddit) => {
  const response = await fetch(
    `https://www.reddit.com/r/${subreddit}.json?limit=3`
  );
  // console.log(response);
  const responseJSON = await response.json();
  // console.log(responseJSON);
  fetchPostsResponses.push(responseJSON);
  // console.log("fetchPostsResponses");
  // console.log(fetchPostsResponses);

  parseResults(fetchPostsResponses);
};

const parseResults = (fetchPostsResponses) => {
  const allPosts = [];
  // console.log(fetchPostsResponses);

  fetchPostsResponses.forEach((response) => {
    allPosts.push(...response.data.children);
  });
  // console.log("allPosts");
  // console.log(allPosts);
  // postByUser = { posts: [] };
  // allPosts.forEach(({ data: { author, title, permalink } }) => {});

  statsByUser = {};
  postsByUser = {};

  allPosts.forEach(({ data: { author, score } }) => {
    statsByUser[author] = !statsByUser[author]
      ? { postCount: 1, score }
      : {
          postCount: statsByUser[author].postCount + 1,
          score: statsByUser[author].score + score,
        };
  });

  allPosts.forEach(({ data: { author, title, permalink } }) => {
    postsByUser[author] = !postsByUser[author]
      ? { title, permalink }
      : {
          title,
          permalink,
        };
  });

  // console.log(statsByUser);
  // console.log(postsByUser);

  // const userList = Object.keys(statsByUser);
  // console.log(userList);
  const userList = Object.keys(statsByUser).map((username) => ({
    username,
    score: statsByUser[username].score,
    postCount: statsByUser[username].postCount,
  }));
  // console.log(userList);

  const userList2 = Object.keys(postsByUser).map((author) => ({
    author,
    title: postsByUser[author].title,
    permalink: postsByUser[author].permalink,
  }));
  console.log(userList2);
  // console.log(postByUser);

  // const sortedList = userList.sort((userA, userB) => userB.score - userA.score);
  // console.log(sortedList);

  // How does sortedList compare to userList ?

  displayRankings(userList2);
};

const displayRankings = (userList2) => {
  const container = document.getElementById("results-container");
  userList2.forEach(({ author, title, permalink }, i) => {
    rank = i + 1;
    const userCard = document.createElement("a");
    userCard.href = `https://www.reddit.com/user/${author}`;
    userCard.classList.add("user-card");
    // userCard.innerText = `${rank}. ${username} - ${postCount} post(s) - ${score} point(s)`;
    userCard.innerText = `${author} - ${title} - ${permalink}`;

    container.appendChild(userCard);
  });
};

const subredditSelectForm = document.getElementById("subreddit-select-form");
subredditSelectForm.addEventListener("submit", handleSubmit);

// this should probably change to when I get to adding a form
// the idea is that this replicates the above but hasn't been made yet
// I want to click on a post, and submit another fetch request
// either that, or just click
const postSelectForm = document.getElementById("results-container-comments");
// similar to handleSubmit, except this click will be for comments
// subredditSelectForm.addEventListener("submit", handleClick);
