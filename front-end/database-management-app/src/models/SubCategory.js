export class SubCategory {
    constructor({ id, guid, categoryId, name }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.categoryId = categoryId || 0;
      this.name = name || '';
    }
  }
  