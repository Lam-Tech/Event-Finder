import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class TagCollection {
  constructor() {
    this.name = 'TagCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      tag: { type: String, index: true, unique: true },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Tag = new TagCollection();
