import React, { useEffect, useState } from "react";
import "./Card.css";
import Avatar from "react-avatar";

// Card component to display each ticket
const Card = ({ ticket, groupBy, userName }) => {
  const [checked, setChecked] = useState(false); // State for checkbox

  // Load the saved checkbox state from localStorage when the component mounts
  useEffect(() => {
    const savedCheckedState = localStorage.getItem(`checkbox-${ticket.id}`);
    if (savedCheckedState) {
      setChecked(JSON.parse(savedCheckedState));
    }
  }, [ticket.id]);

  // Save the checkbox state to localStorage whenever it changes
  const handleCheckboxToggle = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    localStorage.setItem(`checkbox-${ticket.id}`, JSON.stringify(isChecked));
  };

  // JSX content to be returned
  const ticketCardContent = (
    <div className="kanban-card-container">
      <div key={ticket.id} className="kanban-ticket">
        <div className="kanban-ticket-header">
          <span className="kanban-ticket-id">{ticket.id}</span>
          {(groupBy === "status" || groupBy === "priority") && (
            <Avatar
              name={userName}
              size="16"
              round={true}
              className="kanban-user-avatar"
            />
          )}
        </div>

        <div className="kanban-ticket-middle">
          {(groupBy === "user" || groupBy === "priority") && (
            <label className="kanban-ticket-checkbox-label">
              <input
                type="checkbox"
                className="kanban-checkbox-hidden"
                checked={checked}
                onChange={handleCheckboxToggle}
              />
              <span className="kanban-checkbox"></span>
            </label>
          )}
          <h3 className="kanban-ticket-title">{ticket.title}</h3>
        </div>

        <div className="kanban-ticket-footer">
          <span className="kanban-ticket-tag">
            <i className="kanban-icon-warning"></i> {ticket.tag || "No title"}
          </span>
        </div>
      </div>
    </div>
  );

  // Return the prepared JSX content
  return ticketCardContent;
};

export default Card;
