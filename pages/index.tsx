import React, { useEffect, useState } from "react";
import NewItem from "./component/NewItem/NewItem";

export default function Home() {
  // hooks
  const [newId, setNewId] = useState<number[]>([]);
  const [resetCounter, setResetCounter] = useState(0);

  // get array of news ids
  useEffect(() => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNewId(data.slice(0, 100));
      });
  }, [resetCounter]);

  // functions
  // Increment counter make new request
  function counterIncrement() {
    setResetCounter(resetCounter + 1);
  }

  // auto request
  setInterval(() => {
    counterIncrement();
  }, 60000);

  return (
    <main className="Home">
      <header>
        <button onClick={counterIncrement}>RESET</button>
      </header>
      <ul>
        {newId.length > 1
          ? newId.map((el) => {
              return <NewItem id={el} key={el} />;
            })
          : "error"}
      </ul>
      {/* <ul>
        {newId.map((el) => {
          return <li key={el}>{el}</li>;
        })}
      </ul> */}
    </main>
  );
}
