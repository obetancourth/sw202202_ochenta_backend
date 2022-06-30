const DaoObject = require('../DaoObject');
module.exports = class CashFlowDao extends DaoObject {
  constructor(db = null) {
    console.log('CashFlowDao db: ', db);
    super(db, 'cashFlow');
  }
  async setup() {
    if (process.env.MONGODB_SETUP) {
      const indexExists = await this.collection.indexExists('userId_1');
      if (!indexExists) {
        await this.collection.createIndex({'userId': 1});
      }
    }
  }

  getAll( userId ) {
    return this.find({userId: this.objectId(userId)});
  }

  async getAllPaged({userId, page=1, pageLimit=25}) {
    const cashFlows = await this.find(
      {userId: this.objectId(userId)},
      null,
      null,
      null,
      null,
      true
    );
    const totalDocs = await cashFlows.count();
    cashFlows.skip(pageLimit * ( page - 1 ))
    cashFlows.limit(pageLimit);
    const cashFlowsDocs = await cashFlows.toArray();
    return {
      total: totalDocs,
      page,
      pageLimit,
      totalPages: Math.ceil(totalDocs/pageLimit),
      cashFlows: cashFlowsDocs
    }
  }

  getById({ codigo }) {
    return this.findById(codigo);
  }

  getGroupByType({userId}) {
    const match = {
      '$match' : {
        userId : this.objectId(userId)
      }
    }
    const groupBy = {
      '$group': {
        _id: '$type',
        count: {'$sum': 1},
        amount: {'$sum': '$amount'}
      }
    }
    const sort = {
      '$sort': {
        _id : -1
      }
    }
    return this.aggregate([match, groupBy, sort]);
  }

  insertOne({ description, date, type, category, amount, userId }) {
    const newCashFlow = {
      description,
      date,
      created: new Date().toISOString(),
      type,
      category,
      amount,
      userId: this.objectId(userId)
    }
    return this.insertOne(newCashFlow);
  }
  updateOne({ ...rest }) {
    console.error('CashFlowDao error:', rest);
    throw new Error('Update not available for CashFlow');
  }
  deleteOne({ codigo }) {
    return super.removeOne(codigo);
  }
}
