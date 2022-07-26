export const searchPhraseValidation = (subreddit) => {
  // subreddit values need to satisfy the following criteria:
  // Condition 1: subreddit.length >= 3 || <= 21
  if (subreddit.length < 3 || subreddit.length > 21) {
    alert(`Subreddits must be between 3 and 21 characters.`);
    document.location.reload();
  }

  // Condition 2: subreddit can't start with an underscore
  if (subreddit[0].includes("_")) {
    alert(`Subreddits cannot start with underscores.`);
    document.location.reload();
  }

  // Condition 3: only letters, numbers and underscores allowed
  subreddit.split("").forEach((letter) => {
    if (!/\w|\d|_/g.test(letter)) {
      alert(`Subreddits can only contain letters, numbers and/or underscores.`);
      document.location.reload();
    }

    // Condition 4 (found by Toni): no error handling
    // Needs try catch added to inform when url is invalid
  });
};
