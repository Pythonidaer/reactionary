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
  // const userList = Object.keys(statsByUser).map((username) => ({
  //   username,
  //   score: statsByUser[username].score,
  //   postCount: statsByUser[username].postCount,
  // }));
  // console.log(userList);

  const userList = Object.keys(postsByUser).map((author) => ({
    author,
    title: postsByUser[author].title,
    permalink: postsByUser[author].permalink,
  }));
  console.log(userList);
  // console.log(postByUser);

  // const sortedList = userList.sort((userA, userB) => userB.score - userA.score);
  // console.log(sortedList);

  // How does sortedList compare to userList ?

  displayPosts(userList);
};

const displayPosts = (userList) => {
  const container = document.getElementById("results-container");
  userList.forEach(({ author, title, permalink }, i) => {
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

const displayPostsUI = (userList) => {
  const container = document.getElementById("results-container");
  userList.forEach(({ author, title, permalink }, i) => {
    rank = i + 1;

    /* =============== */
    /* POST LINK START */
    const postLink = document.createElement("a");
    postLink.href = `https://www.reddit.com${permalink}`;
    postLink.target = `_blank`;
    postLink.classList.add("post-link");
    /* POST LINK END */
    /* =============== */

    /* ========================= */
    /* POST HEADER WRAPPER START */
    const postHeaderWrapper = document.createElement("div");
    postHeaderWrapper.classList.add("post-header-wrapper");
    const postHeader = document.createElement("header");
    postHeader.classList.add("post-header");
    const postHeaderMetadataContainer = document.createElement("div");
    postHeaderMetadataContainer.classList.add("post-header-metadata-container");
    // Adjacent to Seashells
    const postHeaderDescriptorLine = document.createElement("div");
    postHeaderDescriptorLine.classList.add("post-header-descriptor-line");
    const postHeaderDescriptorLineOverflow = document.createElement("div");
    postHeaderDescriptorLineOverflow.classList.add(
      "post-header-descriptor-line-overflow"
    );
    const spanContainer = document.createElement("span");
    const postHeaderPostMetaContainer = document.createElement("span");
    postHeaderPostMetaContainer.innerText = `utc time ago posted here`;
    postHeaderPostMetaContainer.classList.add(
      "post-header-post-meta-container"
    );
    // Adjacent to postHeaderSeparator
    const postHeaderAuthorLink = document.createElement("a");
    postHeaderAuthorLink.href = `https://www.reddit.com/user/${author}`;
    postHeaderAuthorLink.target = `_blank`;
    postHeaderAuthorLink.classList.add("post-header-author-link");
    postHeaderAuthorLink.innerText = `${author}`;
    const postHeaderAvatar = document.createElement("img");
    postHeaderAvatar.alt = `${author} avatar`;
    postHeaderAvatar.src = `https://www.redditstatic.com/mweb2x/img/snoovatars/snoovatar_9.png`;
    postHeaderAvatar.classList.add("post-header-avatar");
    // Adjacent to postHeaderAuthorLink
    const postHeaderSeparator = document.createElement("span");
    postHeaderSeparator.classList.add("post-header-separator");

    // Adjacent to Descriptor Line
    const postHeaderIconSeashells = document.createElement("div");
    postHeaderIconSeashells.classList.add("post-header-icon-seashells");
    /* POST HEADER WRAPPER END */
    /* ========================= */

    /* ========================== */
    /* POST THUMBNAIL TITLE START */
    const postThumbnailTitle = document.createElement("div");
    postThumbnailTitle.classList.add("post-thumbnail-and-title");
    const postTitle = document.createElement("a");
    postTitle.href = `https://www.reddit.com${permalink}`;
    postTitle.classList.add("post-header-post-title-line");
    postTitle.target = `_blank`;
    postTitle.innerText = `title goes here`;
    postThumbnailTitle.appendChild(postTitle);
    /* POST THUMBNAIL TITLE END */
    /* ======================== */

    /* ================= */
    /* POST FOOTER START */
    const postFooter = document.createElement("footer");
    postFooter.classList.add("post-footer");

    /* POST FOOTER END */
    /* =============== */

    container.appendChild(postLink);
    container.appendChild(postHeaderWrapper);
    container.appendChild(postThumbnailTitle);
    container.appendChild(postFooter);
  });
};
