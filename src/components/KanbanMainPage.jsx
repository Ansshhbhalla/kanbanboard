import React, { useState, useEffect } from 'react';
import NavBar from './Navbar/NavBar';
import Card from './Card/Card';
import fetchData from '../datahandler/ApiData'; // Renamed for clarity
import './KanbanMainPage.css';
import addImg from '../assets/add.svg';
import threedot from '../assets/3 dot menu.svg';
import Avatar from 'react-avatar';

// Utility function to filter tickets by user
const groupTicketsByUser = (tickets) => {
  const userMap = new Map();

  tickets.forEach(ticket => {
    const userId = ticket.userId;
    if (!userId) return;

    if (!userMap.has(userId)) {
      userMap.set(userId, []);
    }
    userMap.get(userId).push(ticket);
  });

  return userMap;
};

// Utility function to filter tickets by priority
const groupTicketsByPriority = (tickets) => {
  const priorityMap = new Map();
  tickets.forEach(ticket => {
    const priority = ticket.priority;
    if (priority === -1) return;

    if (!priorityMap.has(priority)) {
      priorityMap.set(priority, []);
    }
    priorityMap.get(priority).push(ticket);
  });
  return priorityMap;
};

// Utility function to filter tickets by status
const groupTicketsByStatus = (tickets) => {
  const statusMap = new Map();
  tickets.forEach(ticket => {
    const status = ticket.status;
    if (!statusMap.has(status)) {
      statusMap.set(status, []);
    }
    statusMap.get(status).push(ticket);
  });
  return statusMap;
};

const priorityLabels = {
  0: "No priority",
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Urgent",
  default: "NA",
};

// Mapping for status images
const statusImages = {
  "Backlog": require("../assets/Backlog.svg").default,
  "Todo": require("../assets/To-do.svg").default,
  "In progress": require("../assets/in-progress.svg").default,
  "Done": require("../assets/Done.svg").default,
  "Low": require("../assets/Img - Low Priority.svg").default,
  "Medium": require("../assets/Img - Medium Priority.svg").default,
  "Canceled": require("../assets/Cancelled.svg").default,
  "High": require("../assets/Img - High Priority.svg").default,
  "Urgent": require("../assets/SVG - Urgent Priority colour.svg").default,
  "No priority": require("../assets/No-priority.svg").default,
};

const KanbanMainPage = () => {
  const [filterType, setFilterType] = useState(() => localStorage.getItem('filterType') || 'status');
  const [sortType, setSortType] = useState(() => localStorage.getItem('sortType') || 'priority'); 
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Effect hook to fetch data on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { tickets: fetchedTickets, users: fetchedUsers } = await fetchData();
        setTickets(fetchedTickets); 
        setUsers(fetchedUsers);      
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };
    fetchTickets();
  }, []); 

  // Effect hook to store filter and sort types in local storage
  useEffect(() => {
    localStorage.setItem('filterType', filterType);
    localStorage.setItem('sortType', sortType);
  }, [filterType, sortType]);

  // Effect hook to apply filters when tickets change
  useEffect(() => {
    if (tickets.length > 0) {
      applyFilters();
    }
  }, [filterType, sortType, tickets]);

  // Function to get priority label based on value
  const getPriorityLabel = (priorityValue) => {
    return priorityLabels[priorityValue] || priorityLabels.default;
  };

  // Function to get the image associated with a ticket status or priority
  const getStatusImage = (status) => {
    return statusImages[status] || statusImages["No priority"];
  };

  // Function to apply filters based on selected filter type
  const applyFilters = () => {
    let groupedTickets;

    switch (filterType) {
      case 'status':
        groupedTickets = groupTicketsByStatus(tickets);
        break;
      case 'user':
        groupedTickets = groupTicketsByUser(tickets);
        break;
      case 'priority':
        groupedTickets = groupTicketsByPriority(tickets);
        break;
      default:
        groupedTickets = new Map();
    }

    // Convert the grouped tickets into an array and sort them
    const ticketArray = Array.from(groupedTickets, ([key, value]) => ({
      key,
      items: sortTickets(value, sortType).filter(ticket => ticket.title && ticket.id),
    }));

    setFilteredTickets(ticketArray);
  };

  // Function to sort tickets based on selected sort type
  const sortTickets = (tickets, sortType) => {
    return tickets.sort((a, b) => {
      if (sortType === 'priority') {
        return b.priority - a.priority;
      } else if (sortType === 'title') {
        return a.title.localeCompare(b.title); 
      }
      return 0;
    });
  };

  // Function to get the user's name by their ID
  const getUserName = (userId) => {
    const user = users.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
  };

  return (
    <div className="kanbanContainer" style={{ backgroundColor: '#f8f9fa' }}> {/* Brighter background color */}
      <NavBar
        setFilterType={setFilterType}
        setSortType={setSortType}
        filterType={filterType}
        sortType={sortType}
      />

      <div className="kanbanSections">
        {filteredTickets.map(group => (
          <div key={group.key} className="kanbanSection" style={{ backgroundColor: '#ffffff' }}> {/* Brighter section color */}
            {/* Render user-specific information */}
            {filterType === "user" && (
              <div>
                <div style={{ display: "flex", padding: "16px 0px", margin: "0 11px", justifyContent: "space-between" }}> {/* Increased padding and margin */}
                  <div style={{ display: "flex" }}>
                    <Avatar
                      name={getUserName(group.key)}
                      size="21" // Increased avatar size
                      round={true}
                      className="userProfileAvatar"
                    />
                    <span>{getUserName(group.key)}</span>
                    <span style={{ paddingLeft: "16px" }}>{group.items.length}</span> {/* Increased padding */}
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}

            {/* Render status-specific information */}
            {filterType === "status" && (
              <div>
                <div style={{ display: "flex", padding: "16px 0px", margin: "0 11px", justifyContent: "space-between" }}> {/* Increased padding and margin */}
                  <div>
                    <img src={getStatusImage(group.key)} className="userProfileAvatar" alt="status" />
                    <span>{group.key}</span>
                    <span style={{ paddingLeft: "9px" }}>{group.items.length}</span> {/* Increased padding */}
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}

            {/* Render priority-specific information */}
            {filterType === "priority" && (
              <div>
                <div style={{ display: "flex", padding: "16px 0px", margin: "0 11px", justifyContent: "space-between" }}> {/* Increased padding and margin */}
                  <div>
                    <img src={getStatusImage(getPriorityLabel(group.key))} className="userProfileAvatar" alt="status" />
                    <span>{getPriorityLabel(group.key)}</span>
                    <span style={{ paddingLeft: "9px" }}>{group.items.length}</span> {/* Increased padding */}
                  </div>
                  <div style={{ display: "flex" }}>
                    <img src={addImg} alt="" />
                    <img src={threedot} alt="" />
                  </div>
                </div>
              </div>
            )}

            {/* Render individual ticket cards */}
            {group.items.map(ticket => (
              <Card
                key={ticket.id}
                ticket={ticket}
                type={filterType}
                userName={getUserName(ticket.userId)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanMainPage;
