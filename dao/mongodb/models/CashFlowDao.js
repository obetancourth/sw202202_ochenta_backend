const { db } = require('../Connection');
const DaoObject = require('../DaoObject');
module.exports = class CashFlowDao extends DaoObject {
  constructor(db = null) {
    console.log('CashFlowDao db: ', db);
    super(db, 'cashFlow');
  }
  async setup() {
    if (process.env.MONGODB_SETUP) {
      // TODO: Agregar Indices
    }
  }

  getAll() {
    return this.find();
  }

  async getAllPaged({page=1, pageLimit=25}) {
    const cashFlows = await this.find(
      {},
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
  getGroupByType() {
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
    return this.aggregate([groupBy, sort]);
  }

  insertOne({ description, date, type, category, amount }) {
    const newCashFlow = {
      description,
      date,
      created: new Date().toISOString(),
      type,
      category,
      amount
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
