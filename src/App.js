import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    const url = `${process.env.REACT_APP_API_URL}/activities`;

    try {
      const response = await fetch(url);
      const obj = await response.json();
      const results = obj.data;
      setActivities(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
