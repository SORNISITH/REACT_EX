import { useState } from "react";
import "./my.css";

const arr = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  "The only way to go fast, is to go well.",
];

const Button = (probs) => {
  // const action = () =< {
  const { key } = probs;
  const [like, setLike] = useState(0);
  const [dislike, setDisLike] = useState(0);
  // }
  const handleClickLike = () => {
    return setLike((like) => like + 1);
  };
  const handleClickDisLike = () => {
    return setDisLike((disLike) => disLike + 1);
  };
  return (
    <>
      <div className="btn-container">
        <button key={key} onClick={handleClickLike} className="btn-vote">
          Like : {like}
        </button>

        <button key={key} onClick={handleClickDisLike} className="btn-vote">
          Dislike : {dislike}
        </button>
      </div>
      <hr></hr>
    </>
  );
};

const Quote = (probs) => {
  const { text, index } = probs;
  return (
    <>
      <div className="quote">
        <p>{`${index + 1} : ${text}`}</p>
      </div>
    </>
  );
};

export default function Ex2() {
  return (
    <>
      <div className="excercise-container">
        <h1>EXCERCISE 2</h1>
        <h1>Reuse component</h1>
        {arr.map((items, index) => (
          <>
            <Quote text={items} index={index} />
            <Button key={index} />
          </>
        ))}
      </div>
    </>
  );
}
