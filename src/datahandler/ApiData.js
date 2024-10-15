// APiData.js
import config from './config';

const APiData = async () => {
  try {
    const response = await fetch(config.API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { tickets, users } = await response.json();
    
    const allStatuses = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
    const existingStatuses = new Set(tickets.map(ticket => ticket.status));
    
    const missingStatuses = allStatuses.filter(status => !existingStatuses.has(status));

    missingStatuses.forEach(status => {
      tickets.push({
        id: '',
        title: '',
        userId: '',
        priority: '-1',
        status: status,
      });
    });

    return { tickets, users };
  } catch (error) {
    console.error("Error fetching API data:", error);
    return { tickets: [], users: [] };
  }
};

export default APiData;
