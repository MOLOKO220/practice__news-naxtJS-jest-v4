import React, { useState, useEffect, useRef } from "react";
import CommentItem from "./component/CommentItem/CommentItem";

export const getServerSideProps = async (contstc: any) => {
  // contstc.query получаем идентификатор данной страницы (id конкретного пользователя)
  return { props: { id: contstc.query.id } };
};

interface typeNewData {
  title?: string;
  score?: number;
  by?: string;
  time?: number;
  kids?: [];
  descendants?: number;
  url?: string;
}

export default function id(props: any) {
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
    <main className="PagesOfNew">
      <div>
        <h6>{newData.title}</h6>
        <a className="PagesOfNew__url" href={newData.url}>
          {newData.url}
        </a>
        <div className="PagesOfNew__date">{date}</div>
        <div className="PagesOfNew__author">by: {newData.by}</div>
        <div className="PagesOfNew__comments">
          <p>Comments: {newData.descendants}</p>
          <ul>
            {newData.kids?.map((el) => {
              return <CommentItem key={el} id={el} />;
            })}
          </ul>
        </div>
      </div>
    </main>
  );
}
