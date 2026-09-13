import React, { useEffect, useState } from "react";
import "./notifi.css";
import axios from "axios";
import { apiUrl } from '../config';

export default function Notification() {
  const [UserNotiStore, setUserNotiStore] = useState([]);

  useEffect(() => {
    let user = sessionStorage.getItem("Userlogindata");
    if (user) {
      let _userName = JSON.parse(user)[0]?.Username;
      axios
        .post(apiUrl('/api/getNotification'), { Username: _userName })
        .then((data) => {
          console.log(data.data.usernotification);
          // Sort notifications to display unread (new) notifications first
          const sortedNotifications = data.data.usernotification.sort(
            (a, b) => (a.IsRead === "false" ? -1 : 1)
          );
          setUserNotiStore(sortedNotifications);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }); 
  

  const ClickHandler = (element) => {
    axios
      .patch(apiUrl(`/api/patchUserNotification/${element._id}`), {
        IsRead: "true",
      })
      .then((apiOutput) => {
        console.log(apiOutput.data.updatenotification);
        
        setUserNotiStore((prev) => {
          // Update the read status and re-sort the notifications
          const updatedNotifications = prev.map((noti) =>
            noti._id === element._id ? { ...noti, IsRead: "true" } : noti
          );
          return updatedNotifications.sort((a, b) => (a.IsRead === "false" ? -1 : 1));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <div className="notifications-container">
      {UserNotiStore.length > 0 ? (
        <table className="notification-table">
          <tbody>
            {UserNotiStore.map((element) => (
              <tr key={element._id} className={element.IsRead === "false" ? "unread" : ""}>
                <td className="notification-text">
                  <p>Username: <strong>{element.Username}</strong></p>
                  <p>Name: <strong>{element.Name}</strong></p>
                  <p>Status: <strong>{element.Status}</strong></p>
                  <p>ShortDescription: <strong>{element.ShortDescription}</strong></p>
                </td>
                <td className="notification-action">
                  {element.IsRead === "false" && (
                    <button className="btn-notification" onClick={() => ClickHandler(element)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-notifications">No notifications available.</p>
      )}
    </div>
  );
}
