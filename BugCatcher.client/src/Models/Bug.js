export class Bug {
  constructor(data = {}) {
    this.creatorId = data.creatorId
    this.description = data.description
    this.title = data.title
    this.closedDate = data.closedDate
    this.closed = data.closed
    this.priority = data.priority
    this.id = data.id
    this.updatedAt = data.updatedAt
    this.creator = data.creator
  }
}
