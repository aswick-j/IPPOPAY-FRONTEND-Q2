import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { minimumDifference } from "./helpers/minimumDifference";

export default function App() {
  const [arrayValue, setArrayValue] = useState([]);

  const [intialValue, setIntialValue] = useState();

  const [data, setData] = useState();

  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setIntialValue(e.target.value);
  };

  const handleArray = (e) => {
    e.preventDefault();
    setArrayValue((arrayValue) => [...arrayValue, intialValue]);
    e.target.reset();
  };
  // console.log(arrayValue);
  const handleValue = () => {
    let arr = arrayValue;
    let nums = arr.map(Number);
    setData(minimumDifference(nums));
    setIntialValue(null);
    setArrayValue([]);
    try {
      let values = nums;
      let answers = minimumDifference(values);
      const data1 = axios.post(
        "http://localhost:8000/api/store",
        { values, answers },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log("====", data1);
    } catch (error) {
      console.error(error.data);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/all")
      .then((response) => setHistory(response.data));
  }, [data]);

  return (
    <div>
      <h2 className="__app-title">
        Find the Maximum Difference Between two numbers
      </h2>
      <form onSubmit={handleArray}>
        <div className="__app-right">
          <div className="__app-inputBox">
            <input
              className="__app-input"
              value={intialValue}
              onChange={handleChange}
            />
            <label>Enter the Value</label>
            <button className="__add-btn">Add</button>
            {arrayValue.length > 0 ? (
              <div className="__add-array">[{arrayValue.join(",")}]</div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </form>
      <button className="__submit-btn" onClick={handleValue}>
        Submit
      </button>
      {data ? (
        <p className="__app-submit-ptag">
          The Maximum Difference Between the submitted array is {data}
        </p>
      ) : (
        <p></p>
      )}
      {/* VALUE = {data} */}
      <h2 className="__app-histry-title">History</h2>
      <table className="__app-table">
        <thead>
          <tr>
            <th>Arrays</th>
            <th>Answers</th>
          </tr>{" "}
        </thead>
        {history
          .slice(0)
          .reverse()
          .map((item) => (
            <tr>
              <td>[{item.values.join(",")}]</td>
              <td>{item.answers}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
