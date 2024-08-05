import React from 'react';

const BidForm = ({ thriftItem, handleBid }) => {
  const handleInvalid = (e) => {
    if (e.target.validity.valueMissing) {
      e.target.setCustomValidity('Please enter a bid amount.');
    } else if (e.target.validity.rangeUnderflow) {
      e.target.setCustomValidity('Your bid must be higher than the current bid.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <form className="bid-form" onSubmit={(e) => {
      e.preventDefault();
      const newBid = parseFloat(e.target.elements.newBid.value);
      handleBid(thriftItem._id, newBid);
    }}>
      <input 
        type="number" 
        name="newBid" 
        min={thriftItem.currentBid + 1} 
        step="0.01" 
        required 
        onInvalid={handleInvalid} 
        onInput={(e) => e.target.setCustomValidity('')} 
      />
      <button type="submit">Bid!</button>
    </form>
  );
};

export default BidForm;