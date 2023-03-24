migrate((db) => {
  const collection = new Collection({
    "id": "utqyv3drl1687jo",
    "created": "2023-03-23 14:56:25.428Z",
    "updated": "2023-03-23 14:56:25.428Z",
    "name": "sharedImages",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lg1t6j3b",
        "name": "image",
        "type": "file",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
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
  const collection = dao.findCollectionByNameOrId("utqyv3drl1687jo");

  return dao.deleteCollection(collection);
})
