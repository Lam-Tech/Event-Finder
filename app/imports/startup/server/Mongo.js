import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Tag } from '../../api/Event/Tag';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addTag(tag) {
  console.log(`  Adding: ${tag.tag} `);
  Tag.collection.insert(tag);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Tag.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default tags.');
    Meteor.settings.defaultHobbies.map(tag => addTag(tag));
  }
}
