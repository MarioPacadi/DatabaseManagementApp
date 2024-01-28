export class Product {
    constructor({ id, guid, name, productNumber, color, subCategoryId, price }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.name = name || '';
      this.productNumber = productNumber || '';
      this.color = color || '';
      this.subCategoryId = subCategoryId || 0;
      this.price = price || 0;
    }
  }
  