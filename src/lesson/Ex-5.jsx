import { useState } from "react";
import "./css-lesson/ex-5.css";
import { v4 as uuid, v4 } from "uuid";
import data1 from "./data/ex5data.js";
const Contacts = [
  {
    id: v4(),
    name: "Sor Nisith",
    phonenumber: "+85569907747",
  },
  {
    id: v4(),
    name: "NZ",
    phonenumber: "+855185246867",
  },
  {
    id: v4(),
    name: "XX DESING",
    phonenumber: "+85543456361",
  },
];

const Ex5 = () => {
  const [nameValue, setNameValue] = useState("");
  const [ContactNumberValue, setContactNumberValue] = useState("+855");
  const [dataObj, setDataObj] = useState(data1);
  const [toggle, setToggle] = useState(true);
  const showToggle = toggle ? dataObj.slice(dataObj.length - 10) : dataObj;
  const changeToggle = (event) => {
    event.preventDefault();
    setToggle(!toggle);
  };
  const RenderRandomData = (event) => {
    event.preventDefault();
    setDataObj(
      (dataObj) => dataObj.slice(Math.random() * 10),
      Math.random() * 10 + 10
    );
  };
  const RenderTableRoW = () => {
    let indexCount = 1;
    return (
      <>
        {showToggle.toReversed().map((tr) => (
          <>
            <tr onClick={() => tableRowHandleClick(tr.id)} key={tr.id}>
              <td key={Math.random() + new Date().getMilliseconds}>
                {indexCount++}
              </td>
              <td key={Math.random() + new Date().getMilliseconds}>
                {tr.id.slice(0, 5)}
              </td>
              <td key={Math.random() + new Date().getMilliseconds}>
                {tr.name}
              </td>
              <td key={Math.random() + new Date().getMilliseconds}>
                {tr.phonenumber}
              </td>
            </tr>
          </>
        ))}
      </>
    );
  };
  const tableRowHandleClick = (id) => {
    const checkKey = (ele) => {
      if (ele.id === id) {
        setNameValue(ele.name);
        setContactNumberValue(ele.phonenumber);
      }
    };

    dataObj.map((ele) => checkKey(ele));

    // setNameValue("test");
  };

  const removeContactAll = (event) => {
    event.preventDefault();
    setDataObj((dataObj) => dataObj.slice(0, 0));
  };
  const removeContact = (event) => {
    event.preventDefault();
    const checkRemove = (ele, index) => {
      if (ele.name === nameValue) {
        setDataObj((dataObj) =>
          dataObj.slice(0, index).concat(dataObj.slice(index + 1))
        );
        setNameValue("");
        setContactNumberValue("+855");
        return;
      }
    };
    dataObj.map((ele, index) => checkRemove(ele, index));
  };
  const addContact = (event) => {
    event.preventDefault();
    const checkName = [];
    dataObj.map((ele) => checkName.push(ele.name));
    for (let i = 0; i < checkName.length - 1; i++) {
      if (
        checkName[i].toLowerCase().replace(/\s/g, "") ===
        nameValue.toLowerCase().replace(/\s/g, "")
      ) {
        alert("USER NAME EXISTS Please provice other Name");
        return;
      }
    }

    if (/^(\+)?[0-9]*$/.test(nameValue)) return;
    if (ContactNumberValue.length == 4) return;
    if (!nameValue || nameValue.length < 2) return;
    const objContact = {
      id: v4(),
      name: nameValue,
      phonenumber: ContactNumberValue,
    };
    setDataObj((dataObj) => dataObj.concat(objContact));
    setNameValue("");
    setContactNumberValue("+855");
  };

  const handleInputNameChange = (event) => {
    setNameValue(event.target.value);
  };
  const handleInputNumberChange = (event) => {
    const value = event.target.value;
    if (!/^(\+)?[0-9]*$/.test(value)) return;
    if (value[4] == 0) return;
    if (value[0] !== "+") return;
    setContactNumberValue(value);
  };

  const ContactTable = () => {
    return (
      <>
        <div id="Ex5-main">
          <table>
            <thead>
              <tr>
                <th>N*</th>
                <th>ID</th>
                <th>Name</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              <RenderTableRoW />
            </tbody>
          </table>
        </div>
      </>
    );
  };
  return (
    <>
      <div className="excercise-container">
        <h1>EXCERCISE 5</h1>
        <h2>PHONE BOOK & ADDRESS BOOK</h2>
        <div id="Ex5-container">
          <div id="Ex5-side">
            <form>
              <label htmlFor="name">FuLL Name</label>
              <input
                placeholder="   Please Enter name! *"
                id="name"
                type="text"
                onChange={handleInputNameChange}
                value={nameValue}
              />
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="phoneNumber"
                placeholder="   Phone Number"
                type="text"
                onChange={handleInputNumberChange}
                value={ContactNumberValue}
              />
              <div className="btn-container">
                <button onClick={addContact}>
                  <p>Add Contact</p>
                </button>
                <button onClick={removeContact}>
                  <p>Remove Contact</p>
                </button>
              </div>
              <div className="btn-container">
                <button
                  onClick={dataObj.length <= 0 ? RenderTableRoW : changeToggle}
                >
                  <p>{toggle ? "Show ALL" : "Show only 10"}</p>
                </button>
                <button id="rm-btn" onClick={removeContactAll}>
                  <p>Remove ALL</p>
                </button>
              </div>
              <div className="btn-container">
                <button
                  onClick={
                    dataObj.length <= 0 ? RenderTableRoW : RenderRandomData
                  }
                >
                  <p>Get Random Data</p>
                </button>
                <button id="get-btn" onClick={RenderTableRoW}>
                  <p>Recover Data</p>
                </button>
              </div>
            </form>
          </div>
          <ContactTable></ContactTable>
        </div>
      </div>
    </>
  );
};

export default Ex5;
