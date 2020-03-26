const CosmosClient = require('@azure/cosmos').CosmosClient

class TweetDao {

    constructor(cosmosClient, databaseId, containerId) {
        this.client = cosmosClient
        this.databaseId = databaseId
        this.collectionId = containerId

        this.database = null
        this.container = null
    }

    async init() {
        const dbResponse = await this.client.databases.createIfNotExists({
            id: this.databaseId
        })

        this.database = dbResponse.database
        const coResponse = await this.database.containers.createIfNotExists({
            id: this.collectionId
        })

        this.container = coResponse.container
    }

    async find(querySpec) {
        if (!this.container) {
            throw new Error('Collection is not initialized.')
        }
        const { resources } = await this.container.items.query(querySpec).fetchAll()
        return resources
    }
}

module.exports = TweetDao
