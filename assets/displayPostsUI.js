import { formatMovement } from "./formatMovement.js";
import { togglePostSelection } from "./togglePostSelection.js";
export const displayPostsUI = (userList) => {
  const postContainer = document.getElementById("results-container-posts");
  let rank;

  userList.forEach(
    ({ author, title, permalink, created_utc, num_comments, ups }, i) => {
      rank = i + 1;
      const html = `
        <article class="transition">
          <a
            href='https://www.reddit.com${permalink}'
            target="_blank"
            class="post-link"
          ></a>
          <div class="post-header-wrapper">
            <header class="post-header">
              <div class="post-header-metadata-container">
                <div class="post-header-descriptor-line">
                  <div class="post-header-descriptor-line-overflow">
                    <span>
                      <span class="post-header-post-meta-container"
                        ><a
                          href="https://www.reddit.com/user/${author}"
                          class="post-header-author-link"
                          ><img
                            alt="u/${author} avatar"
                            class="post-header-avatar"
                            src="https://www.redditstatic.com/mweb2x/img/snoovatars/snoovatar_9.png"
                            style="background-color: rgb(113, 147, 255)"
                          />${author}</a
                        ><span class="post-header-separator"></span>${formatMovement(
                          created_utc
                        )}</span
                      >
                    </span>
                  </div>
                </div>
                <div class="post-header-icon-seashells">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M120 256C120 286.9 94.93 312 64 312C33.07 312 8 286.9 8 256C8 225.1 33.07 200 64 200C94.93 200 120 225.1 120 256zM280 256C280 286.9 254.9 312 224 312C193.1 312 168 286.9 168 256C168 225.1 193.1 200 224 200C254.9 200 280 225.1 280 256zM328 256C328 225.1 353.1 200 384 200C414.9 200 440 225.1 440 256C440 286.9 414.9 312 384 312C353.1 312 328 286.9 328 256z"
                    />
                  </svg>
                </div>
              </div>
            </header>
          </div>
          <div class="post-thumbnail-and-title">
            <div class="post-title">
              <a
                href="https://www.reddit.com${permalink}"
                class="post-header-post-title-line"
                target="_blank"
                >${title}</a
              >
            </div>
          </div>
          <footer class="post-footer">
            <div class="post-footer-tools">
              <div class="post-footer-votes">
                <div class="upvote">
                  <svg
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
                  </svg>
                </div>
                <div class="vote-score">${ups}</div>
              </div>
              <button class="post-footer-save-button">
                <span class="post-footer-button-container">
                  <svg
                    class="post-footer-save-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path
                      d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"
                    />
                  </svg>
                </span>
              </button>
              <a href="" class="post-footer-comments-link">
                <svg
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
                </svg> ${num_comments}</a
              >
              <span class="post-footer-toggled">
              <div class="filter__input input input_toggle"><input class="input__source" id="toggle-${rank}" type="checkbox" name="filter-toggle"><label class="input__label" for="toggle-${rank}"></label></div>
              </span>
            </div>
          </footer>
        </article>`;
      postContainer.insertAdjacentHTML("beforeend", html);
      // postContainer.appendChild(articlePerPost);
    }
  );
  togglePostSelection();
};
