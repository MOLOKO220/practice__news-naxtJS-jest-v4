import React, { useEffect, useState } from "react";

interface commentProps {
  id: number;
}

interface commentData {
  by?: string;
  text?: string;
  time?: number;
}

export default function CommentItem(props: commentProps) {
  // hooks
  const [comment, setComment] = useState<commentData>({});
  const [date, setDate] = useState<any>();

  // get a comment
  useEffect(() => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${props.id}.json?print=pretty`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setComment(data);
      });
  }, []);

  // change format date
  useEffect(() => {
    const date = new Date(Number(`${comment.time}000`));
    setDate(
      `${date.getFullYear()}.${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }.${
        date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      }  ${date.getHours()}:${date.getMinutes()}`
    );
  }, [comment]);

  return (
    <li className="CommentItem">
      <header>
        <h6>{comment.by}</h6>
        <p>{date}</p>
      </header>
      <p>{comment.text}</p>
    </li>
  );
}
