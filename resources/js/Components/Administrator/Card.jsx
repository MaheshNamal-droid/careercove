import React from "react";

const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;