export class Customer {
    constructor({ id, guid, name, surname, email, telephone, cityId }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.name = name || '';
      this.surname = surname || '';
      this.email = email || '';
      this.telephone = telephone || '';
      this.cityId = cityId || null;
    }
  
    static createDefault() {
      return new Customer({});
    }
  }
  