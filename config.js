module.exports = {
  host: process.env.HOST || 'PLACE_COSMOS_DB_HOST_HERE',
  authKey: process.env.AUTH_KEY || 'PLACE_COSMOS_DB_AUTH_KEY_HERE',
  databaseId: "ToDoList",
  containerId: "Items"
};