export const formatCurrentDate = () => {
    const now = new Date();
    
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    
    const timeFormatted = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).toLowerCase();
    
    return {
      date: dateFormatted,
      time: timeFormatted
    };
  };
  
  /**
   * Convert date string to date input format (yyyy-mm-dd)
   * @param {Date} date - Date object to format
   * @returns {string} Date formatted as yyyy-mm-dd
   */
  export const formatDateForInput = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  /**
   * Convert time string to time input format (hh:mm)
   * @param {Date} date - Date object to format
   * @returns {string} Time formatted as hh:mm
   */
  export const formatTimeForInput = (date = new Date()) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };