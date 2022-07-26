import { searchPhraseValidation } from "./searchPhraseValidation.js";
import { fetchPosts } from "./fetchPosts.js";

const postContainer = document.getElementById("results-container-posts");

export const handleSubmit = (e) => {
  e.preventDefault();
  postContainer.innerHTML = "";
  const subreddit = document.getElementById("subreddit").value;
  document.getElementById("subreddit").value = "";

  searchPhraseValidation(subreddit);
  fetchPosts(subreddit);
};
