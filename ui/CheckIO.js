export const handleCheckOut = (personId, peopleInCommunity, setPeopleInCommunity) => {
  // This function is triggered when a user is checked out from an event
  Meteor.call('checkOut', personId, (error, result) => {
    if (error) {
      console.error("Error checking out:", error);
    } else {
      // If the check-out was successful, update the checkedIn state of the person
      updateState(personId, peopleInCommunity, setPeopleInCommunity, result);
    }
  });
};
  
export const handleCheckIn = (personId, peopleInCommunity, setPeopleInCommunity) => {
  // This function is triggered when a user is checked into an event
  Meteor.call('checkIn', personId, (error, result) => {
    if (error) {
      console.error("Error checking in:", error);
    } else {
      // If the check-in was successful, update the checkedIn state of the person
      updateState(personId, peopleInCommunity, setPeopleInCommunity, result);
    }
  });
};

const updateState = (personId, peopleInCommunity, setPeopleInCommunity, result) => {
  // A helper function to update the Check-in or Check-out state of a person
  const updatedPeople = peopleInCommunity.map(person => {
    if (person._id === personId) {
      const { checkedIn, checkInTime, checkedOut, checkOutTime } = result.find(item => item.personId === personId);
      return { ...person, checkedIn, checkInTime, checkedOut, checkOutTime };
    }
    return person;
  });
  setPeopleInCommunity(updatedPeople);
}
