import axios from "axios";
import { useState, useEffect } from "react";
const RenderLists = ({ objNotes }) => {
  if (objNotes.length == 0) return;
  return (
    <>
      {objNotes.map((ele, index) => (
        <li key={ele.id}>{`${index + 1} ${ele.name} : ${ele.number}`}</li>
      ))}
    </>
  );
};
const Test = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    console.log("first effect");
    axios
      .get("https://backendservertest.onrender.com/api/persons")
      .then((response) => {
        console.log(response.data);
        setNotes(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="excercise-container">
        <h1>my Test</h1>
        <ul>
          <RenderLists objNotes={notes} />
        </ul>
      </div>
    </>
  );
};

export default Test;
