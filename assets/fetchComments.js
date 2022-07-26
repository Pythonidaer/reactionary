import { parseComments } from "./parseComments.js";
export const fetchComments = async (comments) => {
  const fetchCommentsResponses = [];

  const response = await fetch(`${comments}.json?limit=1`);
  const responseJSON = await response.json();
  fetchCommentsResponses.push(responseJSON);
  // console.log(fetchCommentsResponses);

  parseComments(fetchCommentsResponses);
};
