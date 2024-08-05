import React from 'react';
import ThriftItem from './ThriftItem';

const ThriftItemList = ({ thriftItems, handleDelete, handleEdit, handleBid }) => {
  return (
    <ul className="furniture-items">
      {thriftItems.map(thriftItem => (
        <ThriftItem 
          key={thriftItem._id} 
          thriftItem={thriftItem} 
          handleDelete={handleDelete} 
          handleEdit={handleEdit} 
          handleBid={handleBid} 
        />
      ))}
    </ul>
  );
};

export default ThriftItemList;