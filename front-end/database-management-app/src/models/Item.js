export class Item {
  constructor({ id, guid, billId, quantity, productId, totalPrice }) {
    this.id = id || 0;
    this.guid = guid || '';
    this.billId = billId || 0;
    this.quantity = quantity || 0;
    this.productId = productId || 0;
    this.totalPrice = totalPrice || 0;
  }
}
