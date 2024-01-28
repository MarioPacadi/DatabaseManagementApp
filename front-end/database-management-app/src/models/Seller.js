export class Seller {
    constructor({ id, guid, name, surname, permanentEmployee }) {
      this.id = id || 0;
      this.guid = guid || '';
      this.name = name || '';
      this.surname = surname || '';
      this.permanentEmployee = permanentEmployee || false;
    }
  }
  