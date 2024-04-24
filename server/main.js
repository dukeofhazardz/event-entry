import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import { People } from '../people/people';
import { Communities } from '../communities/communities';
import { CheckedIO } from '../checked_io/checked_io';

Meteor.startup(() => {
  // DON'T CHANGE THE NEXT LINE
  loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
  const people = People.find({}).fetch()

  people.forEach(person => {
    // Checks if the person already has an entry in the CheckedIO collection, if not inserts a new entry.
    const existingCheckedIO = CheckedIO.findOne({ personId: person._id });
    if (!existingCheckedIO) {
      CheckedIO.insert({
        personId: person._id,
        communityId: person.communityId,
        checkedIn: false,
        checkInTime: null,
        checkedOut: false,
        checkOutTime: null,
      });
    }
  });
});

Meteor.methods({
  getCommunityName(communityId) {
    // A Meteor method that fetches Community name from the Community Collection using id 
    let communityName = ""
    const community = Communities.find({"_id": communityId}).fetch();
    community.forEach(item => {
      communityName = item.name
    })
    return communityName;
  },

  getAllCommunities() {
    // A Meteor method that fetches all Community entries in the Community Collection
    return Communities.find({}).fetch();
  },

  getPeopleAndCheckedIOInCommunity(selectedCommunity) {
    // A Meteor method that returns an Object containing people and checked-io entries 
    const people = People.find({"communityId": selectedCommunity}).fetch()
    const checkedIO = CheckedIO.find({"communityId": selectedCommunity}).fetch()
    return { people, checkedIO }
  },

  checkIn(personId) {
    // A Meteor function that updates the the CheckedIO collection after a Person has been checked in
    CheckedIO.update({"personId": personId}, { $set: {checkedIn: true, checkedOut: false, checkInTime: new Date()}});
    return CheckedIO.find({"personId": personId}).fetch();
  },

  checkOut(personId) {
    // A Meteor function that updates the the CheckedIO collection after a Person has been checked out
    CheckedIO.update({"personId": personId}, { $set: {checkedIn: false, checkedOut: true, checkOutTime: new Date()}});
    return CheckedIO.find({"personId": personId}).fetch();
  }
});
