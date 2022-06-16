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

  // statsByUser = {};
  postsByUser = {};

  // allPosts.forEach(({ data: { author, score } }) => {
  //   statsByUser[author] = !statsByUser[author]
  //     ? { postCount: 1, score }
  //     : {
  //         postCount: statsByUser[author].postCount + 1,
  //         score: statsByUser[author].score + score,
  //       };
  // });

  console.log(allPosts[0]);

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

  // console.log(statsByUser);
  console.log(postsByUser);

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
    created_utc: postsByUser[author].created_utc,
    num_comments: postsByUser[author].num_comments,
    ups: postsByUser[author].ups,
  }));
  // console.log(userList);
  // console.log(postByUser);

  // const sortedList = userList.sort((userA, userB) => userB.score - userA.score);
  // console.log(sortedList);

  // How does sortedList compare to userList ?

  // displayPosts(userList);
  displayPostsUI(userList);
};

// const displayPosts = (userList) => {
//   const container = document.getElementById("results-container");
//   userList.forEach(({ author, title, permalink }, i) => {
//     rank = i + 1;
//     const userCard = document.createElement("a");
//     userCard.href = `https://www.reddit.com/user/${author}`;
//     userCard.classList.add("user-card");
//     // userCard.innerText = `${rank}. ${username} - ${postCount} post(s) - ${score} point(s)`;
//     userCard.innerText = `${author} - ${title} - ${permalink}`;

//     container.appendChild(userCard);
//   });
// };

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
  console.log(userList[0]);
  userList.forEach(
    ({ author, title, permalink, created_utc, num_comments, ups }, i) => {
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
      postHeaderMetadataContainer.classList.add(
        "post-header-metadata-container"
      );
      // Adjacent to Seashells
      const postHeaderDescriptorLine = document.createElement("div");
      postHeaderDescriptorLine.classList.add("post-header-descriptor-line");
      const postHeaderDescriptorLineOverflow = document.createElement("div");
      postHeaderDescriptorLineOverflow.classList.add(
        "post-header-descriptor-line-overflow"
      );
      const spanContainer = document.createElement("span");
      const postHeaderPostMetaContainer = document.createElement("span");
      // postHeaderPostMetaContainer.innerText = `utc time ago posted here`;
      postHeaderPostMetaContainer.innerText = `${created_utc}`;
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
      postHeaderIconSeashells.innerHTML = `                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
    <path
      d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
    />
  </svg>`;

      postHeaderAuthorLink.prepend(postHeaderAvatar);
      postHeaderPostMetaContainer.prepend(postHeaderSeparator);
      postHeaderPostMetaContainer.prepend(postHeaderAuthorLink);
      // postHeaderPostMetaContainer.innerText = `utc time ago posted here`;
      spanContainer.appendChild(postHeaderPostMetaContainer);
      postHeaderDescriptorLineOverflow.appendChild(spanContainer);
      postHeaderDescriptorLine.appendChild(postHeaderDescriptorLineOverflow);
      postHeaderMetadataContainer.appendChild(postHeaderDescriptorLine);
      postHeaderMetadataContainer.appendChild(postHeaderIconSeashells);
      postHeader.appendChild(postHeaderMetadataContainer);
      postHeaderWrapper.appendChild(postHeader);

      /* POST HEADER WRAPPER END */
      /* ========================= */

      /* ========================== */
      /* POST THUMBNAIL TITLE START */
      const postThumbnailTitle = document.createElement("div");
      postThumbnailTitle.classList.add("post-thumbnail-and-title");
      const postTitle = document.createElement("div");
      postTitle.classList.add("post-title");
      const postHeaderPostTitleLine = document.createElement("a");
      postHeaderPostTitleLine.href = `https://www.reddit.com${permalink}`;
      postHeaderPostTitleLine.classList.add("post-header-post-title-line");
      postHeaderPostTitleLine.target = `_blank`;
      // postHeaderPostTitleLine.innerText = `title goes here`;
      postHeaderPostTitleLine.innerText = `${title}`;

      postTitle.appendChild(postHeaderPostTitleLine);
      postThumbnailTitle.appendChild(postTitle);
      /* POST THUMBNAIL TITLE END */
      /* ======================== */

      /* ================= */
      /* POST FOOTER START */
      const postFooter = document.createElement("footer");
      postFooter.classList.add("post-footer");
      const postFooterTools = document.createElement("div");
      postFooterTools.classList.add("post-footer-tools");
      // Nested under Footer Tools
      const postFooterVotes = document.createElement("div");
      postFooterVotes.classList.add("post-footer-votes");
      // Nested under Footer Votes
      const upvotes = document.createElement("div");
      upvotes.classList.add("upvote");
      upvotes.innerHTML = `                <svg
    class="VotingBox__svg"
    height="16"
    viewBox="0 0 16 16"
    width="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="m8 .200001c.17143 0 .33468.073332.44854.201491l7.19996 8.103998c.157.17662.1956.42887.0988.64437-.0968.21551-.3111.35414-.5473.35414h-3.4v5.496c0 .3314-.2686.6-.6.6h-6.4c-.33137 0-.6-.2686-.6-.6v-5.496h-3.4c-.236249 0-.450507-.13863-.547314-.35414-.096807-.2155-.058141-.46775.09877-.64437l7.200004-8.103998c.11386-.128159.27711-.201491.44854-.201491zm-5.86433 8.103999h2.66433c.33137 0 .6.26863.6.6v5.496h5.2v-5.496c0-.33137.2686-.6.6-.6h2.6643l-5.8643-6.60063"
      fill-rule="evenodd"
    ></path>
  </svg>`;
      const voteScore = document.createElement("div");
      voteScore.classList.add("vote-score");
      // voteScore.innerText = `upvote number here`;
      voteScore.innerText = `${ups}`;

      // Nested under Footer Tools
      const postFooterSaveBtn = document.createElement("button");
      postFooterSaveBtn.classList.add("post-footer-save-button");
      const postFooterBtnContainer = document.createElement("span");
      postFooterBtnContainer.classList.add("post-footer-button-container");
      postFooterBtnContainer.innerHTML = `                <svg
    class="post-footer-save-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
    />
  </svg>`;

      // Nested under Footer Tools
      const postFooterCommentsLink = document.createElement("a");
      postFooterCommentsLink.classList.add("post-footer-comments-link");
      postFooterCommentsLink.innerHTML = `              <svg
    class="post-footer-comments-link-icon"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clip-rule="evenodd"
      d="M4.00001 0C2.99219 0 2.02564 0.400356 1.31301 1.11299C0.600368 1.82563 0.200012 2.79218 0.200012 3.8V8.6C0.200012 9.60782 0.600368 10.5744 1.31301 11.287C2.02564 11.9996 2.99219 12.4 4.00001 12.4H5.35149L7.5753 14.6238C7.57545 14.624 7.5756 14.6241 7.57575 14.6243C7.81006 14.8586 8.18996 14.8586 8.42428 14.6243L10.6485 12.4H12C13.0078 12.4 13.9744 11.9996 14.687 11.287C15.3997 10.5744 15.8 9.60782 15.8 8.6V3.8C15.8 2.79218 15.3997 1.82563 14.687 1.11299C13.9744 0.400356 13.0078 0 12 0H4.00001ZM8.00001 13.3515L9.97575 11.3757C10.0883 11.2632 10.2409 11.2 10.4 11.2H12C12.6896 11.2 13.3509 10.9261 13.8385 10.4385C14.3261 9.95088 14.6 9.28956 14.6 8.6V3.8C14.6 3.11044 14.3261 2.44912 13.8385 1.96152C13.3509 1.47393 12.6896 1.2 12 1.2H4.00001C3.31045 1.2 2.64913 1.47393 2.16153 1.96152C1.67394 2.44912 1.40001 3.11044 1.40001 3.8V8.6C1.40001 9.28956 1.67394 9.95088 2.16153 10.4385C2.64913 10.9261 3.31045 11.2 4.00001 11.2H5.60001C5.7657 11.2 5.91569 11.2672 6.02427 11.3757C6.02435 11.3758 6.02443 11.3759 6.02452 11.376L8.00001 13.3515Z"
      fill="inherit"
      fill-rule="evenodd"
    ></path>
  </svg> ${num_comments}`;

      // Nested under Footer Tools
      const postFooterToggled = document.createElement("span");
      postFooterToggled.classList.add("post-footer-toggled");
      postFooterToggled.innerHTML = `              <svg
    class="post-footer-toggled-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 576 512"
  >
    <path
      d="M192 352C138.1 352 96 309 96 256C96 202.1 138.1 160 192 160C245 160 288 202.1 288 256C288 309 245 352 192 352zM384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384C490 64 576 149.1 576 256C576 362 490 448 384 448zM384 128H192C121.3 128 64 185.3 64 256C64 326.7 121.3 384 192 384H384C454.7 384 512 326.7 512 256C512 185.3 454.7 128 384 128z"
    />
  </svg>`;

      postFooterVotes.appendChild(upvotes);
      postFooterVotes.appendChild(voteScore);
      postFooterTools.appendChild(postFooterVotes);
      postFooterSaveBtn.appendChild(postFooterBtnContainer);
      postFooterTools.appendChild(postFooterSaveBtn);
      postFooterTools.appendChild(postFooterCommentsLink);
      postFooterTools.appendChild(postFooterToggled);
      postFooter.appendChild(postFooterTools);

      /* POST FOOTER END */
      /* =============== */

      // need to create a parent article for each post
      // article needs to be position relative
      // currently each link spans entire column
      // so they are all 100% of the container - bad
      // article is currently entire container
      // article will become each post in container
      container.appendChild(postLink);
      container.appendChild(postHeaderWrapper);
      container.appendChild(postThumbnailTitle);
      container.appendChild(postFooter);
    }
  );
};

// Need to write a function for the following:
/*
Reddit posts display: "9h"
- this implies "Post was created 9 hours ago"
- Reddit API returns a created_utc time
- That created_utc time needs to be converted to hours
- The current time needs to be converted to hours
- The current hours needs to be subtracted by post time
- The absolute number should be added to an h
*/
