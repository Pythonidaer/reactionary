import { handleSubmit } from "./handleSubmit.js";

const subredditSelectForm = document.getElementById("subreddit-select-form");
// const afters = [];

subredditSelectForm.addEventListener("submit", handleSubmit);

// There are 3 features I need to figure out here:
// 1. Make checkbox and container function as one
// 2. Toggle hide/display for 1 checked post to show only
// 3. Fetch comments, but clear comments from prior fetches
