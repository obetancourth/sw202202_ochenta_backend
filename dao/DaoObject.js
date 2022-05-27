const Connection = require('./Connection');
module.exports = class DaoObject{
  conn = null;
  constructor(db = null) {
    if(db){
      this.conn = db;
    }
  }
  async init(){
    if (!this.conn) {
      try{
        this.conn = await Connection.getDB();
      } catch(ex) {
        console.log('DaoObject : ', ex);
        throw ex;
      }
    }
  }
}
