//db baru
var dbPromised = idb.open('premier-league', 1, (upgradeDb) => {
  var teamsObjectStore = upgradeDb.createObjectStore('teams', {
    keyPath: 'id',
    autoIncrement: true,
  })
  teamsObjectStore.createIndex('team_name', 'team_name', { unique: false })
})

//save team
let addFavorite = (team) => {
  dbPromised
    .then((db) => {
      var tx = db.transaction('teams', 'readwrite')
      var store = tx.objectStore('teams')
      console.log(team)
      store.put(team)
      return tx.complete
    })
    .then(() => {
      console.log('team berhasil disimpan')
    })
}

//mengambil seluruh data dari indexed db
let getAll = () => {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        var tx = db.transaction('teams', 'readonly')
        var store = tx.objectStore('teams')
        return store.getAll()
      })
      .then((articles) => {
        resolve(articles)
      })
  })
}

//mengambil satu data dari database berdasarkan id
let getById = (id) => {
  var _id = parseInt(id)
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => { 
        let tx = db.transaction('teams', 'readonly')
        let store = tx.objectStore('teams')
        return store.get(_id)
      })
      .then((articles) => {
        resolve(articles)
      })
  })
}

//delete data
let deleteTeamById = (id) => {
  dbPromised
    .then((db) => {
      var _id = parseInt(id)
      var tx = db.transaction('teams', 'readwrite')
      var store = tx.objectStore('teams')
      store.delete(_id)
      return tx.complete
    })
    .then(() => {
      console.log('Item deleted')
    })
}
