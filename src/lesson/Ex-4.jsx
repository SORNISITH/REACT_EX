import { useState } from "react";
import "./my.css";
import { v4 as uuidv4, v4 } from "uuid";

const Ex4 = (props) => {
  const [inputValue, setNewInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const handleInputChange = (event) => {
    setNewInputValue(event.target.value);
  };

  const addList = (event) => {
    event.preventDefault();
    if (!inputValue) {
      return;
    }

    const nodeObj = {
      content: inputValue,
      important: Math.random() < 0.5,
      id: uuidv4(),
    };

    setNotes(notes.concat(nodeObj));
    setNewInputValue("");
  };

  const removeList = (event) => {
    event.preventDefault();
    setNotes(props.notes);
  };
  const notesToShow = showAll
    ? notes
    : notes.filter((notes) => notes.important === true);

  const toggle = (event) => {
    event.preventDefault();
    setShowAll(!showAll);
  };
  return (
    <>
      <div className="excercise-container">
        <h1>EXCERCISE 4</h1>
        <h1>Uniq ID & Control Component</h1>
        <h1>Notes</h1>
        <ul>
          {notesToShow.map((ele) => (
            <List key={ele.id} listItems={ele} />
          ))}
        </ul>

        <h1>Form</h1>
        <form>
          <button onClick={toggle}>Toogle : {showAll ? "ON" : "OFF"} </button>
          <br />
          <input onChange={handleInputChange} value={inputValue} type="text" />
          <br />
          <button type="summit" onClick={addList}>
            Add
          </button>
          <button onClick={removeList}>Remove</button>
        </form>
      </div>
    </>
  );
};

const List = ({ listItems }) => {
  return (
    <>
      <li>{listItems.content}</li>
    </>
  );
};

export default Ex4;
