export class User {
    constructor({ id, name, email, password }) {
      this.id = id || 0;
      this.name = name || '';
      this.email = email || '';
      this.password = password || '';
    }

    static createDefault() {
        return new User({});
    }

}
  