import React from "react";

// Define the interface for button props
type ButtonProps = {
  children: React.ReactNode; // The content inside the button
  onClick?: () => void; // Optional click handler function
  className?: string; // Optional additional CSS classes
  disabled?: boolean; // Optional disabled state
};

// Define the Button component using React functional component syntax
export const Button: React.FC<ButtonProps> = ({
  children, // Button content
  onClick, // Click event handler
  className = "btn btn-primary", // Default to an empty string if no class is provided
  disabled = false, // Default to false if disabled prop is not provided
}) => {
  return (
    <button
      onClick={onClick} // Assign the click handler
      disabled={disabled} // Assign the disabled state
      className={`${className}`} // Apply styling classes, including additional classes from props
    >
      {children} {/* Render button content */}
    </button>
  );
};
