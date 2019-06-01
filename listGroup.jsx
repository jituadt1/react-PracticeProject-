import React, { Component } from "react";

const ListGroup = props => {
  const { items, textProperty, value, onItemSelect, selectedItem } = props;
  console.log(selectedItem);

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[value]}
          className={
            selectedItem === item ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  value: "_id"
};

export default ListGroup;
