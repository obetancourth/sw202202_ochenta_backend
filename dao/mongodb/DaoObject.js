const ObjectId = require('mongodb').ObjectId;
const Connection = require('./Connection');

module.exports = class DaoObject {
  conn = null;
  collectionName = null;
  collection = null;

  constructor(db = null, collection = null) {
    if (db) {
      this.conn = db;
    }
    if (collection) {
      this.collectionName = collection;
    }
  }
  async init() {
    if (!this.conn) {
      try {
        this.conn = await Connection.getDB();
      } catch (ex) {
        console.log('DaoObject : ', ex);
        throw ex;
      }
    }
    if(!this.collection){
      try {
        this.collection = await this.conn.collection(this.collectionName);
      } catch (ex) {
        console.log('DaoObject : ', ex);
      }
    }
  }

  find(query={}, projection=null, orderBy=null, limit=null, skip=null, returnCursor=false){
    const options = {
      projection,
      sort:orderBy,
      limit,
      skip
    }
    if(returnCursor)
      return this.collection.find(query, options);
    else
      return this.collection.find(query, options).toArray();
  }
}
