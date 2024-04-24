export const peopleInEvent = (peopleInCommunity) => {
	// This function returns the number of people in an event
	let count = 0;
	peopleInCommunity.map(person => {
		if (person.checkedIn === true) {
			count += 1
		}
	});
	return count
}

export const peopleInEventByCompany = (peopleInCommunity) => {
	// This functions returns a string of the number of people in a event grouping by company.
	const companyCounts = {}
	let returnString = ""

	peopleInCommunity.forEach(person => {
		if (person.checkedIn === true) {
			const companyName = person.companyName || "No Company";
			if(!companyCounts[companyName]) {
				companyCounts[companyName] = 1
			} else {
				companyCounts[companyName] += 1
			}
		}
	});

	// Converting companyCounts results to string so it can be displayed in the Event form
	Object.entries(companyCounts).forEach(([company, count], index) => {
		returnString += `${company} (${count})`;
		if (index < Object.keys(companyCounts).length - 1) {
				returnString += ", ";
		}
	});
	return returnString;
}

export const peopleNotCheckedIn = (peopleInCommunity) => {
	// This function returns the number of people that are not yet checked into the event
	let count = 0;
	peopleInCommunity.map(person => {
		if (person.checkedIn === false) {
			count += 1
		}
	});
	return count
}