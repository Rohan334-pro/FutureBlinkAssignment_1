import React from "react";

function BlockButton({ icon, title, description, onClick, color }) {
  return (
    <div
      className="cmp-block-btn flex w-50 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 rounded-md border rounded-sm brd-col"
      onClick={onClick}
    >
      {/* Icon Container - Fixed square */}
      <div
        className={`icon-wrapper bg-${color}`}
      >
        {icon}
      </div>

      {/* Text Content - Flex grow */}
      <div className="text-content">
        <p className="font-semibold text-base mb-1">{title}</p>
        <small className="p-sm text-gray-600">{description}</small>
      </div>
    </div>
  );
}

export default BlockButton;
