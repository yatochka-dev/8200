migrate((db) => {
  const collection = new Collection({
    "id": "lq9s2uub7jpagu1",
    "created": "2023-03-23 15:20:55.983Z",
    "updated": "2023-03-23 15:20:55.983Z",
    "name": "shares",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2wkrzfgg",
        "name": "url",
        "type": "url",
        "required": true,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("lq9s2uub7jpagu1");

  return dao.deleteCollection(collection);
})
