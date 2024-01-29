export class Bill {
    constructor({ id, guid, date, billNumber, customerId, sellerId, creditCardId, comment, total }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.date = date || '';
      this.billNumber = billNumber || '';
      this.customerId = customerId || 0;
      this.sellerId = sellerId || 0;
      this.creditCardId = creditCardId || 0;
      this.comment = comment || '';
      this.total = total || 0;
    }

  static createDefault() {
    return new Bill({});
  }
  }
  