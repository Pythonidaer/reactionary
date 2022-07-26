# reactionary

Messing around with Reddit API and React to find out what I can achieve in a few weeks time.

[Partially useful](https://rymur.github.io/setup)

[Secrets make friends](https://github.com/reddit-archive/reddit/wiki/OAuth2)

How do I input secret information from another file?
[dotenv](https://youtu.be/uk9pviyvrtg?t=110)
[rateLimit](https://youtu.be/uk9pviyvrtg?t=1436)

Instructions:

1. www.reddit.com - choose a subreddit to view
2. www.reddit.com/r/amateur_boxing.json (add the json)
3. Inspector Console -> Network -> refresh page
4. Review amateur_boxing.json -> Review dist, after, children

dist is the number of posts that are being sent back to us.

- default is around

children is the actual post themselves.

- so it's an array with ~25 objects in it
- each representing information about a post

after is kind of like a bookmark that we can use in the following request.

- in order to fetch the next "page" of requests
- within the first response, an after string is provided by the API
- you can attach that to the next request in order to get the next page

Parameters.

1. ?after=t3_v0t4dj - reddit gives us the following 25 posts

- it gives us a new after property to attach to the following request
- to make another fetch request to get the following ~25 posts

2. &limit=100 - we can get up to 100 posts at a time

Notes:
UTC Time: https://www.youtube.com/watch?v=DXPkCxTUXSw
More UTC: https://www.youtube.com/watch?v=OvRFRPkyd3M
UNIX converter: https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/#:~:text=Convert%20Unix%20Timestamp%20to%20Date%20in%20JavaScript&text=getDate()%20returns%20the%20day,hour%20format%20for%20that%20time.

Epoc converter: https://www.epochconverter.com/

Subreddit format: https://www.reddit.com/r/modhelp/comments/1gd1at/name_rules_when_trying_to_create_a_subreddit/
https://www.reddit.com/r/help/comments/592kmw/are_there_subreddit_name_restrictions/

Because regex is hard: https://bobbyhadz.com/blog/javascript-check-if-regex-matches-entire-string#:~:text=Use%20the%20test()%20method,entire%20string%2C%20and%20false%20otherwise.

Checkbox Codepen: https://codepen.io/dpatrikeev/pen/pdMroM

Resizing SVG: https://pixelied.com/home

Filter: https://www.javascripttutorial.net/javascript-array-filter/
