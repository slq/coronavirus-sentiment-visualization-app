const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('./config')
const TweetList = require('./tweetList')
const TweetDao = require('./tweetDao')

const path = require('path')
const logger = require('morgan')
const express = require('express')
const app = express()
const port = 3000

const cosmosClient = new CosmosClient({
    endpoint: config.host,
    key: config.authKey
})

const tweetDao = new TweetDao(cosmosClient, config.databaseId, config.containerId)
const tweetList = new TweetList(tweetDao)

tweetDao
    .init(err => {
        console.error(err)
    })
    .catch(err => {
        console.error(err)
        console.error('Shutting down because there was an error setting up the database.')
        process.exit(1)
    })

app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index', { title: 'Twitter #WFH' })
})

app.get('/api/cities', function (req, res, next) {
    tweetList.showTweets(req, res).catch(next)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`))