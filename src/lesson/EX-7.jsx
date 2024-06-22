import { useEffect, useState, useRef } from "react";
import { v4 as uuid, v4 } from "uuid";

import axios from "axios";
import Btn from "./BTN/btn.jsx";
import WeatherApp from "./WeatherAPP/openweather.jsx";

const Ex7 = () => {
  const [getDataWeather, setDataWeather] = useState(null);
  const [dataQuery, setDataQuery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [mainList, setMainList] = useState(null);
  const [showDetail, setShowDetail] = useState(true);
  const clear = () => {
    setMainList(null);
    setShowDetail(false);
    setDataWeather(null);
  };
  const api = {
    key: "d70bc7143055e32cbdb36d8fe42ceb12",
    base: "https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=",
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setDataQuery(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        // Handle the error here
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (mainList && mainList.capital && mainList.capital.length > 0) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${mainList?.capital[0]}&units=metric&appid=${api.key}`
        )
        .then((res) => {
          setDataWeather(res.data);
          console.log(getDataWeather);
        })
        .catch((error) => {
          // Handle the error here
          console.error(error);
        });
    }
  }, [mainList]);
  const handleInputChange = (event) => {
    event.preventDefault();

    setInputValue(event.target?.value);
    setShowDetail(true);
  };
  const RenderDetailMain = () => {
    if (!mainList) return;
    const arrayKey = Object.keys(mainList).map(
      (ele) => ele.toUpperCase() + " : "
    );

    console.log(arrayKey);
    const getFromLink = (arg) => {
      return mainList[arg];
    };
    const getFromObj = (arg) => {
      if (typeof mainList[arg] == "string") return mainList[arg];
      if (typeof mainList[arg] == "number") return mainList[arg];
      if (typeof mainList[arg] == "object") {
        const result = Object.values(mainList[arg]);
        console.log(result);
        return result?.join(" , ");
      }
    };
    const showMore = () => {
      return (
        <>
          <hr />
          <h1>
            {arrayKey[0]}
            {mainList?.name?.common}
          </h1>
          <h2>
            {arrayKey[11]}
            {getFromObj("capital")}
          </h2>
          <h3>
            {arrayKey[20]} {getFromObj("area")}
          </h3>
          <h2>
            {arrayKey[15]} {getFromObj("languages")}
          </h2>
          <img
            style={{
              width: "200px",
              height: "150px",
              position: "absolute",
              top: "100px",
              right: 0,
            }}
            src={getFromLink("flags")?.svg}
            alt={getFromLink("flags")?.alt}
          />
          <h2></h2>
        </>
      );
    };
    const showLess = () => {
      return (
        <>
          <hr />
          <h1>test</h1>
        </>
      );
    };
    return !showDetail ? showMore() : showMore();
  };
  const RenderListCountry = () => {
    return (
      <>
        {loading
          ? ""
          : dataQuery

              ?.filter((items) => {
                return inputValue?.toLowerCase() == ""
                  ? items
                  : items?.name?.common?.toLowerCase().includes(inputValue);
              })
              ?.filter((items, ind) => {
                return inputValue?.length == 0
                  ? items
                  : inputValue?.length == 1
                  ? ind < 20
                  : ind < 10;
              })
              ?.map((ele) => (
                <>
                  <li key={v4()}>
                    <div className="flex">
                      {ele.name.common + `    `}
                      <Btn
                        findEle={ele}
                        setMainList={setMainList}
                        id={uuid()}
                      />
                    </div>
                  </li>
                </>
              ))}
      </>
    );
  };

  return (
    <>
      <div className="excercise-container">
        <h1>Excercise 6</h1>
        <h1>Find Country</h1>
        <div className="ex-container">
          <div style={side_div}>
            <input
              placeholder="Please Search Country by Name Here"
              onChange={handleInputChange}
              type="text"
            />

            <ol>
              <RenderListCountry />
            </ol>
          </div>
          <div style={main_div}>
            <h1>
              {loading
                ? "Server Loading......!"
                : mainList?.length == 0
                ? `Result Search :   Countries`
                : "<< Information >>"}
            </h1>
            <h2 onClick={() => clear()}>- - Clear Screen - -</h2>
            <RenderDetailMain />
            <WeatherApp weatherData={getDataWeather} />
          </div>
        </div>
      </div>
    </>
  );
};
const side_div = {
  width: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContain: "center",
};
const main_div = {
  border: "1px solid gray",
  width: "60%",
  display: "flex",
  flexDirection: "column",
  position: "relative",
};

export default Ex7;
