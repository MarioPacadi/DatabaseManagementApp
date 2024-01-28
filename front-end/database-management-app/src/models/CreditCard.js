export class CreditCard {
    constructor({ id, guid, type, cardNumber, expirationMonth, expirationYear }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.type = type || '';
      this.cardNumber = cardNumber || '';
      this.expirationMonth = expirationMonth || 0;
      this.expirationYear = expirationYear || 0;
    }
  }
  