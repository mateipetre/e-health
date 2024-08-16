export default class AbstractDBModel {
    constructor(id, rev, createdAt, updatedAt) {
      this.id = id;
      this.rev = rev;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }  