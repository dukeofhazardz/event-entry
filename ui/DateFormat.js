export const formatDate = (timestamp) => {
  // This function returns a formatted date string for the Check-in/Check-out time in the Event form
    if (!timestamp) return "N/A";
    
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    const formattedDate = `${padZero(month)}/${padZero(day)}/${year}, ${padZero(hours)}:${padZero(minutes)}`;
  
    return formattedDate;
  };
  
  const padZero = (value) => {
    // A helper function that ensures that each component of the date has two digits, with leading zeros if necessary.
    return String(value).padStart(2, '0');
  };
  