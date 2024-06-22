import "./my.css";
import data from "./data/dataEx3.js";
const Course = ({ course }) => {
  return (
    <>
      <div className="excercise-container">
        <h1>EXCERCISE 3</h1>
        <h1>Map items</h1>
        {course.map((x) => (
          <>
            <h1 key={x.id + "h1"} className="text">
              {x.name}
            </h1>
            {x.parts.map((y) => (
              <h2
                className="text"
                key={y.id + "part"}
              >{`${y.name} : ${y.exercises}`}</h2>
            ))}
            <h2 key={x.id + "name"} className="text-result">
              TOTAL OF EX SCORE ={" "}
              {x.parts.map((value) => value.exercises).reduce((a, b) => a + b)}
            </h2>
          </>
        ))}
      </div>
    </>
  );
};
const Ex3 = () => {
  return <Course course={data} />;
};

export default Ex3;
