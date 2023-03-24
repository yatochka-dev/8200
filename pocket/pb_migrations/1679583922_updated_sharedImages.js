migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("utqyv3drl1687jo")

  collection.listRule = ""
  collection.viewRule = ""
  collection.createRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("utqyv3drl1687jo")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null

  return dao.saveCollection(collection)
})
