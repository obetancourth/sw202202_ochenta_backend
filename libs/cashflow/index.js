const DaoObject = require('../../dao/mongodb/DaoObject');
module.exports = class Category {
  cashFlowDao = null;

  constructor(cashFlowDao = null) {
    if (!(cashFlowDao instanceof DaoObject)) {
      throw new Error('An Instance of DAO Object is Required');
    }
    this.cashFlowDao = cashFlowDao;
  }
  async init() {
    await this.cashFlowDao.init();
    await this.cashFlowDao.setup();
  }
  async getVersion() {
    return {
      entity: 'CashFlow',
      version: '1.0.0',
      description: 'CRUD de CashFlows'
    };
  }

  async addCashFlow({
    description = 'New CashFlow',
    date = new Date().toISOString(),
    type = 'INCOME',
    category = 'salary',
    amount = 0
  }) {
    const result = await this.cashFlowDao.insertOne(
      {
        description,
        date,
        type,
        category,
        amount
      }
    );
    return {
      description,
      date,
      type,
      category,
      amount,
      result
    };
  };

  async getAllCashFlows() {
    return this.cashFlowDao.getAll();
  }
  async getPagedCashFlows(page=1, limit=20) {
    return this.cashFlowDao.getAllPaged({ page, pageLimit:limit});
  }

  async getCashFlowGroupedByType() {
    return this.cashFlowDao.getGroupByType();
  }

  async getCashFlowById({ codigo }) {
    return this.cashFlowDao.getById({ codigo });
  }

  async deleteCategory({ codigo }) {
    const cashFlowToDelete = await this.cashFlowDao.getById({ codigo });
    const result = await this.cashFlowDao.deleteOne({ codigo });
    return {
      ...cashFlowToDelete,
      deleted: result.changes
    };
  }
}
