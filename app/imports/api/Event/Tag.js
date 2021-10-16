import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VaccineCollection. It encapsulates state and variable values for stuff.
 */
class TagCollection {
  constructor() {
    this.name = 'TagCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      Tag: { type: String, index: true, unique: true },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Tag = new TagCollection();
