import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The VaccineCollection. It encapsulates state and variable values for stuff.
 */
class EventCollection {
  constructor() {
    this.name = 'EventCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      owner: { label: 'owner', type: String },
      // ownerName: String,
      members: { label: 'members', type: Array, optional: true },
      'members.$': {
        type: String,
      },
      title: { label: 'Event', type: String },
      statusType: {
        type: String,
        allowedValues: ['Online', 'Offline'],
      },
      date: { label: 'Data', type: Date },
      location: { label: 'Address', type: String },
      information: { label: 'Information', type: String, optional: true },
      pHave: { label: 'PeopleIn', type: Number },
      maxWant: { label: 'MaxPeopleWant', type: Number },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Event = new EventCollection();
