import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import events from "./events";
import './CustomCalendar.css'; // 커스텀 CSS 파일 경로
import Modal from 'react-modal';
import axios from "axios";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState(events);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState();
  
  const eventPropGetter = (event, start, end, isSelected) => {
      const now = new Date(new Date().setHours(new Date().getHours() - 3));
      let backgroundColor = 'red'; // 기본색: 과거 이벤트
      if (start < now) {
          backgroundColor = 'gray'; // 미래 이벤트 색상
      }
      return {
        
          style: {
            backgroundColor,
            cursor: 'pointer', // 호버 효과를 위해 포인터 커서 설정
            transition: 'background-color 0.2s ease', // 부드러운 전환 설정
          },
          // 호버 시 배경색 변경
          onMouseOver: () => {
              if (start < now) {
                  backgroundColor = 'lightgray'; // 과거 이벤트 호버 색상
              } else {
                  backgroundColor = 'lightcoral'; // 미래 이벤트 호버 색상
              }
          },
          onMouseOut: () => {
              if (start < now) {
                  backgroundColor = 'gray';
              } else {
                  backgroundColor = 'red';
              }
          },
        };
  };
  const seatHandle = (event) => {
    axios
      .get("http://localhost:8080/api/v1/programInfo/calender")
      .then((response) => {

        response.data.result.calenderResponseDtoList.map((data, index) => { 

          console.log("data.programName:",data.programName);
          console.log("data.licenseEndDate:",data.licenseEndDate);
          
          const licenseEndDate = data.licenseEndDate;
          const dateParts = licenseEndDate.split('-');
          const year = parseInt(dateParts[0], 10);
          const month = parseInt(dateParts[1], 10) - 1;  // 월은 0부터 시작합니다.
          const day = parseInt(dateParts[2], 10);

          // 날짜 객체 생성
          const start = new Date(year, month, day);
          const end = new Date(year, month, day);
          
          setEventsData((prevEvents) => [
            ...prevEvents,
            {
              start,
              end,
              title: data.programName,
            },
          ]);

        });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  
  useEffect(() => {
    seatHandle();
  },[]);


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

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      fontSize: '12px', // 원하는 크기로 설정
    };
    return {
      style: style,
    };
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
        views={[ "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => openModal()}
        eventPropGetter={eventPropGetter}  
        //eventStyleGetter={eventStyleGetter}   

        onRequestClose={closeModal} />
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
