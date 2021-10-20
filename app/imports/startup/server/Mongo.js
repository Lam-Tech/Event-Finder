import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Event } from '../../api/Event/Event';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addEvent(event) {
  console.log(`  Adding: ${event.title} `);
  Event.collection.insert(event);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Event.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvents.map(event => addEvent(event));
  }
}
