import React, { useState, useEffect } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    const url = `${process.env.REACT_APP_API_URL}/people`;

    try {
      const response = await fetch(url);
      const obj = await response.json();
      const results = obj.data;
      setPeople(results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const onInputChange = (e) => {
    setInputText(e.target.value);
  };

  const onPeopleSubmit = async () => {
    const url = `${process.env.REACT_APP_API_URL}/people`;
    const conf = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText }),
    };

    try {
      const response = await fetch(url, conf);
      const obj = await response.json();

      if (obj.status === "success") {
        await fetchPeople();
        setInputText("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onPeopleDelete = async (id) => {
    const url = `${process.env.REACT_APP_API_URL}/activities/${id}`;
    const conf = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, conf);
      const obj = await response.json();

      if (obj.status === "success") {
        await fetchPeople();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="container space-y-4 mx-auto max-w-md mt-12">
        <h1 className="text-3xl font-black">Personas</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Agregar persona</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Nombre"
              onChange={onInputChange}
              value={inputText}
              className="w-full pr-16 input input-primary input-bordered"
            />
            <button
              className="absolute top-0 right-0 rounded-l-none btn btn-primary"
              onClick={onPeopleSubmit}
            >
              Agregar
            </button>
          </div>
        </div>
        {people &&
          people.map(({ _id, text }) => (
            <div key={_id} className="card shadow-lg">
              <div className="card-body flex justify-between flex-row">
                <p>{text}</p>
                <button
                  className="btn btn-xs"
                  onClick={() => onPeopleDelete(_id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-4 h-4 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
