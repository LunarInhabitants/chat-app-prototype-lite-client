import React from "react";

export default ({ text, handleTextChange }) => (
  <div class="chat-input">
    <input
      type="text"
      value={text}
      placeholder="Type nonsense here..."
      onChange={handleTextChange}
      onKeyDown={handleTextChange}
    />
  </div>
);
