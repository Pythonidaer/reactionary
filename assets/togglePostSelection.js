import { fetchComments } from "./fetchComments.js";
export const togglePostSelection = () => {
  const toggleSpans = document.querySelectorAll(".input__source");

  toggleSpans.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      if (toggle.checked) {
        const comments = toggle.closest("article").firstElementChild.href;
        fetchComments(comments);
      }
    });
  });
};
