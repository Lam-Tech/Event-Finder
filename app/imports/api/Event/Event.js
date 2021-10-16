import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VaccineCollection. It encapsulates state and variable values for stuff.
 */
class EventCollection {
  constructor() {
    this.name = 'VaccineCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      owner: String,
      ownerName: String,
      title: { label: 'Event', type: String },
      date: { label: 'Data', type: Date },
      location: { label: 'Address', type: String },
      information: { label: 'Information', type: String },
      pHave: { label: 'PeopleIn', type: Number },
      maxWant: { label: 'MaxPeopleWant', type: Number },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

export const Event = new EventCollection();
