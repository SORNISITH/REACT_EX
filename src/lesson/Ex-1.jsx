import { useState } from "react";
import "./my.css";

const Statis = (probs) => {
  const { countGood, countNeutral, countBad } = probs;
  console.log(!countGood);
  const findAverage = () => {
    return (countGood + countNeutral - countBad) / totalState();
  };
  const findPositive = () => {
    return ((countGood + countNeutral - countBad) / totalState()) * 100;
  };
  const totalState = () => {
    return countGood + countNeutral + countBad;
  };

  const RenderText = () => {
    const statetext1 = (
      <>
        <p>{"GOOD : " + countGood}</p>
        <p>{"Neutral : " + countNeutral}</p>
        <p>{"BAD : " + countBad}</p>
        <h3>{"Average : " + findAverage()}</h3>
        <h3>{"Positive : " + findPositive() + "%"}</h3>
      </>
    );

    const nostate = <p>No given feedback</p>;

    return !countGood && !countNeutral && !countBad ? nostate : statetext1;
  };
  return (
    <>
      <h1>Statistic Total : {totalState()}</h1>
      <RenderText />
    </>
  );
};

export default function Ex1() {
  const [countGood, setCountGood] = useState(0);
  const [countNeutral, setCountNatural] = useState(0);
  const [countBad, setCountBad] = useState(0);

  const increaseGood = () => {
    return setCountGood((countGood) => countGood + 1);
  };
  const increaseNeutral = () => {
    return setCountNatural((countNeutral) => countNeutral + 1);
  };
  const increaseBad = () => {
    return setCountBad((countBad) => countBad + 1);
  };

  return (
    <>
      <div className="excercise-container">
        <h1>EXCERCISE 1</h1>
        <h1>Give Feedback</h1>
        <button onClick={increaseGood} className="btn-feedback">
          GODD
        </button>
        <button onClick={increaseNeutral} className="btn-feedback">
          Neutral
        </button>
        <button onClick={increaseBad} className="btn-feedback">
          Bad
        </button>
        <Statis
          countGood={countGood}
          countNeutral={countNeutral}
          countBad={countBad}
        ></Statis>
      </div>
    </>
  );
}
