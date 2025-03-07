import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Card component: A reusable UI component with background, padding, and shadow styling.
export const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    // Combines default styles with optional className for customization.
    <div className={`bg-gray-800 p-4 rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

// CardContent component: Provides padding around child elements within a card.
export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};


