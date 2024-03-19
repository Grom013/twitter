import React, { useEffect, useState } from 'react';
import './Statistic.css';
import { fetchData } from '../../public/assets/fetchData.js';

function Statistic() {
  const [allMessages, setAllMessages] = useState();
  const [users, setUsers] = useState();
  const [todayMessages, setTodayMessages] = useState();
  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData();
        setAllMessages(data.static.allMessages);
        setUsers(data.static.users);
        setTodayMessages(data.static.todayMessages);
      } catch (error) {
        console.error('Error', error);
      }
    }
    getData();
  }, []);
  return (
      <div className="statistic">
          <div className="stat">
              <div className="stat-number" id="users">{users}</div>
              <div className="stat_desc">
                  Пользователей
                  <br />
                  {' '}
                  зарегистрировано
              </div>
          </div>
          <div className="stat">
              <div className="stat-number" id="allMessages">{allMessages}</div>
              <div className="stat_desc">
                  Сообщений
                  <br />
                  написано
              </div>
          </div>
          <div className="stat">
              <div className="stat-number" id="todayMessages">{todayMessages}</div>
              <div className="stat_desc">
                  Написано
                  <br />
                  сегодня
              </div>
          </div>
      </div>
  );
}

export default Statistic;
