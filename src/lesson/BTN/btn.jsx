import { useEffect, useState, useRef } from "react";
import { v4 as uuid, v4 } from "uuid";

const Btn = ({ findEle, setMainList, id }) => {
  const [showDetail, setShowDetail] = useState(false);

  const findCountry = (event) => {
    event.preventDefault();
    setShowDetail((showDetail) => !showDetail);
    setMainList(findEle);
    console.log(findEle);
  };

  return (
    <>
      <button
        disabled={showDetail}
        onClick={findCountry}
        className="btn-show"
        id={id}
      >
        {showDetail ? "Show Less" : "Show Detail"}
      </button>
    </>
  );
};

export default Btn;
