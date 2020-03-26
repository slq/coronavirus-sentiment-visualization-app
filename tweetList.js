const TweetDao = require("./TweetDao")

class TweetList {

    constructor(tweetDao) {
        this.tweetDao = tweetDao;
    }

    async showTweets(req, res) {
        const querySpec = {
            query: "SELECT * FROM root r"
        };

        const items = await this.tweetDao.find(querySpec);
        res.json(items)
    }
}

module.exports = TweetList;
