import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";

const NavBar = ({ setFilterType, setSortType, filterType, sortType }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(filterType);
  const [currentOrder, setCurrentOrder] = useState(sortType);
  const dropdownReference = useRef(null);

  const toggleDropdownMenu = () => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
    setIsDropdownOpen(true);
  };

  const togglePriorityDropdown = () => {
    setIsStatusDropdownOpen(false);
    setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setIsPriorityDropdownOpen(false);
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const updateGroupSelection = (option) => {
    setIsPriorityDropdownOpen(false);
    setCurrentGroup(option);
    setFilterType(option.toLowerCase());
    setIsStatusDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  const updateOrderSelection = (option) => {
    setIsStatusDropdownOpen(false);
    setCurrentOrder(option);
    setSortType(option.toLowerCase());
    setIsPriorityDropdownOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideDropdown = (event) => {
      if (dropdownReference.current && !dropdownReference.current.contains(event.target)) {
        setIsDropdownOpen(!setIsDropdownOpen);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [dropdownReference]);

  const navBarComponent = (
    <nav className="navbarr">
      <button className="nav-btn" onClick={toggleDropdownMenu}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/icons_FEtask/Display.svg`}
          alt="Display Icon"
          className="filter-icn"
        />
        Display
        <span className="arrow-dn">&#9662;</span>
      </button>

      {isDropdownOpen && (
        <div
          className="drop-down"
          ref={dropdownReference}
          style={{ position: "absolute", left: "21px", top: "82px" }}
        >
          <div className="drop-group">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4 style={{ color: "#b0b0b2" }}>Grouping</h4>
              <button className="nav-btn" onClick={toggleStatusDropdown}>
                {currentGroup}
                <span className="arrow-dn">&#9662;</span>
              </button>
              {isStatusDropdownOpen && (
                <div
                  className="sub-drop"
                  style={{ position: "absolute", top: "26px", left: "315px" }}
                >
                  <button
                    onClick={() => updateGroupSelection("Status")}
                    className="drop-btn"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => updateGroupSelection("User")}
                    className="drop-btn"
                  >
                    User
                  </button>
                  <button
                    onClick={() => updateGroupSelection("Priority")}
                    className="drop-btn"
                  >
                    Priority
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="drop-sort">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h4 style={{ color: "#b0b0b2" }}>Ordering</h4>  
              <button
                className="nav-btn"
                onClick={togglePriorityDropdown}
              >
                {currentOrder}
                <span className="arrow-dn">&#9662;</span>
              </button>
              {isPriorityDropdownOpen && (
                <div
                  className="sub-drop"
                  style={{ position: "absolute", top: "89px", left: "315px" }}
                >
                  <button
                    onClick={() => updateOrderSelection("Priority")}
                    className="drop-btn"
                  >
                    Priority
                  </button>
                  <button
                    onClick={() => updateOrderSelection("Title")}
                    className="drop-btn"
                  >
                    Title
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  return navBarComponent;
};

export default NavBar;
