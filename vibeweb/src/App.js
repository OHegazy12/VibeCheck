import React, { useState } from "react";
import "./App.css";

const topics = ["Technology", "Sports", "Travel", "Food"];

const UserForm = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleTopicSelection = (event) => {
    const selectedTopic = event.target.value;
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedTopics([...selectedTopics, selectedTopic]);
    } else {
      setSelectedTopics(selectedTopics.filter(topic => topic !== selectedTopic));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedTopics); // you can assign this to each user as needed
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>What are your topics of interest?</h2>
      {topics.map((topic) => (
        <div key={topic}>
          <label htmlFor={topic}>{topic}</label>
          <input
            type="checkbox"
            id={topic}
            value={topic}
            onChange={handleTopicSelection}
            checked={selectedTopics.includes(topic)}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;



