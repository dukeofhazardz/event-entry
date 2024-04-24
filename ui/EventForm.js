import React, { useEffect, useState } from "react"
import { Meteor } from 'meteor/meteor';
import { formatDate } from "./DateFormat";
import { peopleInEvent, peopleInEventByCompany, peopleNotCheckedIn } from "./Summary";
import { handleCheckIn, handleCheckOut } from "./CheckIO";

export const EventForm = () => {
  // This is a function that returns an Event form that checks people into or out of an event
  const [ selectedCommunity, setSelectedCommunity ] = useState("");
  const [ peopleInCommunity, setPeopleInCommunity ] = useState([]);
  const [ communityName, setCommunityName ] = useState("");
  const [ communities, setCommunities ] = useState([]);

  useEffect(() => {
    // Fetches all communities when the component mounts
    Meteor.call('getAllCommunities', (error, result) => {
      if (error) {
        console.log("Error fetching communities", error);
      } else {
        setCommunities(result);
      }
    });
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      // Fetches people and check-in/out status in the selected community
      Meteor.call("getPeopleAndCheckedIOInCommunity", selectedCommunity, (error, result) => {
        if (error) {
          console.error("Error fetching people in community:", error);
        } else {
          // Destructuring the result to separate people and CheckedIO data
          const { people, checkedIO } = result;

          // Merging the people data with CheckedIO data based on personId
          const updatedPeople = people.map(person => {
            const { checkedIn, checkInTime, checkedOut, checkOutTime } = checkedIO.find(item => item.personId === person._id) || {};
            return { ...person, checkedIn, checkInTime, checkedOut, checkOutTime };
          });
          // Updates the state with merged data
          setPeopleInCommunity(updatedPeople);
        }
        // Fetches the name of the selected community using the selectedCommunity Id
        Meteor.call("getCommunityName", selectedCommunity, (error, result) => {
          if (error) {
            console.error("Error fetching community name:", error);
          } else {
            setCommunityName(result);
          }
        });
      });
    }
  }, [selectedCommunity]);

  return (
    <form id="event-id" onSubmit={(e) => e.preventDefault()}>
      {/* Selector form to display communities */}
      <label>
        <select value={selectedCommunity} onChange={(e) => setSelectedCommunity(e.target.value)}>
          <option value="">Select an event</option>
          {communities.map((community) => (
            <option key={community._id} value={community._id}>
              {community.name}
            </option>
          ))}
        </select>
      </label>
      <br />

      {/* Displays people in the selected community */}
      {peopleInCommunity.length > 0 && (
        <div className="form-res">
          {/* Displays event summary */}
          <div className="form-sum">
            <h3>People in the event now: {peopleInEvent(peopleInCommunity)}</h3>
            <h3>People by company in the event right now: {peopleInEventByCompany(peopleInCommunity)}</h3>
            <h3>People not checked-in: {peopleNotCheckedIn(peopleInCommunity)}</h3>
          </div>
          <h4>People Registered for "{communityName}"</h4>
          <ul>
            {peopleInCommunity.map((person) => (
              <div className="person-event">
                <div key={person._id} className="person-box">
                  <p>{`Name: ${person.firstName} ${person.lastName}`}</p>
                  <p>{`Company: ${person.companyName || "N/A"}`}</p>
                  <p>{`Title: ${person.title || "N/A"}`}</p>
                  <p>{`Check-In Time: ${formatDate(person.checkInTime)}`}</p>
                  <p>{`Check-Out Time: ${formatDate(person.checkOutTime)}`}</p>
                  {/* Displays the Check-in or Check-out Button depending on the person's check-in status */}
                  {person.checkedIn ? (
                  <button onClick={() => handleCheckOut(person._id, peopleInCommunity, setPeopleInCommunity)}>Check-out {`${person.firstName} ${person.lastName}`}</button>
                  ) : (
                  <button onClick={() => handleCheckIn(person._id, peopleInCommunity, setPeopleInCommunity)}>Check-in {`${person.firstName} ${person.lastName}`}</button>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
      <br />
    </form>
  );
}
