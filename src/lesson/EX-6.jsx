import { useEffect, useState } from "react";
import axios from "axios";
import "./my.css";
import { v4 as uuid, v4 } from "uuid";

const Ex6 = () => {
  const [notes, setNotes] = useState([]);
  const [views, setView] = useState([]);
  const [msgDiplay, setMsgDisplay] = useState(false);
  const [handleMsgName, setHandleMsgName] = useState([]);
  const RenderTable = ({ objData }) => {
    return (
      <>
        {objData.map((ele) => (
          <>
            <tr>
              <td>
                <input checked key={v4()} type="checkbox"></input>
              </td>
              <td>{ele.id}</td>
              <td>{ele.name}</td>
              <td>{ele.number}</td>
            </tr>
          </>
        ))}
      </>
    );
  };
  const RenderList = ({ objNotes }) => {
    return (
      <>
        {objNotes.map((ele) => (
          <li key={ele.id}>
            {`${ele.name} : ${ele.number}`}{" "}
            <button
              className="delete-contact-btn"
              onClick={() => deleteContact(ele.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </>
    );
  };

  const genData = (event) => {
    event.preventDefault();
    const createRandomName = () => {
      function getRandomLetter() {
        const letters = "bcdfghjklmnpqrstvwxyz";
        const conletters = "aeiou";
        const randomIndex = Math.floor(Math.random() * letters.length);
        const randomconIndex = Math.floor(Math.random() * conletters.length);
        const arrName = letters[randomIndex] + conletters[randomconIndex];
        console.log(arrName);
        return arrName;
      }
      const arrayName = [];
      for (let i = 0; i < Math.floor(Math.random() * 6 + 2); i++) {
        const x =
          i == 0
            ? getRandomLetter()[0].toUpperCase() + getRandomLetter()[1]
            : getRandomLetter();
        arrayName.push(x);
      }
      for (let i = 0; i < Math.floor(Math.random() * 6 + 2); i++) {
        const x =
          i == 0
            ? "-" + getRandomLetter()[0].toUpperCase() + getRandomLetter()[1]
            : getRandomLetter();
        arrayName.push(x);
      }

      const result = arrayName.join("");
      return result;
    };
    const createNumber = () => {
      const math = () => {
        return Math.floor(Math.random() * 10);
      };
      const arrayNumber = [];

      for (let i = 0; i < 11; i++) {
        const x = i == 2 ? "-" : i == 6 ? "-" : math();
        arrayNumber.push(x);
      }

      const result = arrayNumber.join("");
      return result;
    };
    const generateData = () => {
      const addData = {
        id: v4(),
        number: createNumber(),
        name: createRandomName(),
        // name: 123,
        // number: 123,
        // id: v4(),
      };
      return addData;
    };
    setView(views.concat(generateData()));
  };

  const usehandleAdd = (event) => {
    event.preventDefault();
    if (views == "") return alert("Please Generate Data before Add to server");
    // views.map((ele, index) => {
    views.map((ele) => {
      axios.post("http://192.168.100.5:3002/persons/", ele).then((resp) => {
        console.log(resp);
      });
      setNotes((prevNotes) => [...prevNotes, ele]);
    });

    setHandleMsgName(
      views.length !== 0
        ? "Add " + views.length + " contacts to server successful"
        : "Add " + views[0].name + " to server successful"
    );

    setMsgDisplay(true);
    setView([]);
    // });
  };
  const deleteContact = (id) => {
    axios.delete(`http://192.168.100.5:3002/persons/${id}`).then((resp) => {
      console.log(resp);
      setNotes((notes) => notes.filter((ele) => ele.id !== id));

      setMsgDisplay(false);
      setHandleMsgName("Delete " + resp.data.name + "from server successful");
    });
  };
  const deleteAllContacts = (event) => {
    axios.delete("http://192.168.100.5:3002/persons").then((resp) => {
      console.log(resp);
      setNotes([]);
      setMsgDisplay(false);
      setHandleMsgName("Delete " + resp.data.length + "from server successful");
    });
  };
  useEffect(() => {
    console.log("Effect ....");
    axios.get("http://192.168.100.5:3002/persons/").then((resp) => {
      console.log("resp", resp);
      setNotes(notes.concat(resp.data));
      setMsgDisplay(!resp.data.length ? false : true);
      setHandleMsgName(
        resp.data.length == 0
          ? "No more data"
          : "Load " + resp.data.length + " contacts successful from server"
      );
    });
  }, []);
  const styleDisplayMsgTrue = (bool) => {
    let color = bool ? "lightgreen" : "red";
    let h = "80px";
    let border = bool ? "8px solid lightgreen" : "8px solid red";

    return {
      color: color,
      height: h,
      border: border,
    };
  };

  return (
    <>
      <div className="excercise-container">
        <h1>Excercise 6</h1>
        <h1>Axios fectch Data from server</h1>
        <button onClick={genData}>Generate Data</button>
        <button onClick={usehandleAdd}>Add to server</button>
        <button onClick={() => deleteAllContacts}>Delete All</button>
        <br />
        <hr />
        <div style={styleDisplayMsgTrue(msgDiplay)}>
          {handleMsgName.length !== 0 ? (
            <>
              <h1> {handleMsgName}</h1>
            </>
          ) : (
            <>
              <h1>Please Generate For add data</h1>
            </>
          )}
        </div>
        <hr />
        <div className="ex-container">
          <div className="ex6-side">
            <RenderList objNotes={notes} />
          </div>
          <div className="ex6-main">
            <table>
              <thead>
                <tr>
                  <th>Pick</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                <RenderTable objData={views} />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ex6;
