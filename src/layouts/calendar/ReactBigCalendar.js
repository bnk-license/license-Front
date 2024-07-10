import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./events";
import Modal from 'react-modal';
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState();

  const customModalStyles: Modal.Styles = {
    overlay: {
      backgroundColor: " rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "360px",
      height: "180px",
      zIndex: "150",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
      backgroundColor: "white",
      justifyContent: "center",
      overflow: "auto",
    },
  };

  const openModal = () => {
    setModalIsOpen(true);
    };
  
  // const saveModal = () => {
  //   setTitle();
  //   handleSelect();
  //   setModalIsOpen(false);
  // };

  const closeModal = () => {
    // setTitle();
    setModalIsOpen(false);
  };

  // const handleSelect = () => {
  //   console.log(start);
  //   console.log(end);
  //   if (title)
  //     setEventsData([
  //       ...eventsData,
  //       {
  //         start,
  //         end,
  //         title,
  //       },
  //     ]);
  // };
  
  return (
    <div className="App">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => openModal()}
        // onSelectSlot={openModal}
      />
      <Modal style={customModalStyles} isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>제목</h2>
        <p>내용</p>
        {/* <input onChange={(e) => setTitle(e.target.value)} /> */}
        {/* <button onClick={saveModal}>저장</button> */}
        <button onClick={closeModal}>닫기</button>
      </Modal>
    </div>
  );
}
