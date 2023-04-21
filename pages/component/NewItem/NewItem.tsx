import React, { useEffect, useState } from "react";
import Link from "next/link";

interface propsId {
  id: number;
}

interface typeNewData {
  title?: string;
  score?: number;
  by?: string;
  time?: number;
}

export default function NewItem(props: propsId) {
  // hooks
  const [newData, setNewData] = useState<typeNewData>({});
  const [date, setDate] = useState<any>();

  // get a new
  useEffect(() => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNewData(data);
      });
  }, []);

  // change format date
  useEffect(() => {
    const date = new Date(Number(`${newData.time}000`));
    setDate(
      `${date.getFullYear()}.${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }.${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }  ${date.getHours()}:${date.getMinutes()}`
    );
  }, [newData]);

  return (
    <Link href={`/${props.id}`} className="NewItem">
      <h3>{newData.title}</h3>
      <div>
        <span>{date}</span>
        <span>Rating: {newData.score}</span>
        <span>by: {newData.by}</span>
      </div>
    </Link>
  );
}
