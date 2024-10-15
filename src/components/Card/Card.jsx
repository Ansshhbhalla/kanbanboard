import React, { useEffect, useState } from "react";
import "./Card.css";
import Avatar from "react-avatar";

const TicketCard = ({ ticket, type, userName }) => {
  const [isCompleted, setIsCompleted] = useState(false); // State to track if the checkbox is checked

  // Load checkbox state from local storage when the component is first rendered
  useEffect(() => {
    const savedState = localStorage.getItem(`ticket-checkbox-${ticket.id}`);
    if (savedState) {
      setIsCompleted(JSON.parse(savedState)); // Set state if saved in local storage
    }
  }, [ticket.id]);

  // Handle checkbox state change and save it to local storage
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsCompleted(isChecked); // Update checkbox state
    localStorage.setItem(
      `ticket-checkbox-${ticket.id}`,
      JSON.stringify(isChecked)
    ); // Save state to local storage
  };

  return (
    <div className="kanban-card-container">
      <div className="kanban-ticket">
        {/* Header section: displays ticket ID and user avatar */}
        <div className="kanban-ticket-header">
          <span className="kanban-ticket-id">{ticket.id}</span>
          {(type === "status" || type === "priority") && (
            <Avatar
              name={userName}
              size="16"
              round={true}
              className="kanban-user-avatar"
            />
          )}
        </div>

        {/* Middle section: displays checkbox and title */}
        <div className="kanban-ticket-middle">
          {(type === "user" || type === "priority") && (
            <label className="kanban-ticket-checkbox-label">
              <input
                type="checkbox"
                className="kanban-checkbox-hidden"
                checked={isCompleted}
                onChange={handleCheckboxChange}
              />
              <span className="kanban-checkbox"></span>
            </label>
          )}
          <h3 className="kanban-ticket-title">{ticket.title}</h3>
        </div>

        {/* Footer section: displays ticket tag or a default message */}
        <div className="kanban-ticket-footer">
          <span className="kanban-ticket-tag">
            <i className="kanban-icon-warning"></i> {ticket.tag || "No tag"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
