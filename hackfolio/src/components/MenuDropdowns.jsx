import React from "react";

const MenuItem = ({ text, href }) => {
  return (
    <li>
      <a href={href} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
        {text}
      </a>
    </li>
  );
};

export default MenuItem;
