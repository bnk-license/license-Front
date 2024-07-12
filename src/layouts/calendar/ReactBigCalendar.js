import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './CustomCalendar.css'; // 커스텀 CSS 파일 경로
import Modal from 'react-modal';
import axios from "axios";
import { Box, Card } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Detail from "layouts/dashboard/components/Detail";
import { useNavigate } from "react-router-dom";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar(eventsData) {
  const [info, setInfo] = useState([{}]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(eventsData);
  }, []);

  const handleClick = ( event ) => {
    navigate(`/billing/${event.programInfoId}`);
  };

  return (
    <div className="App">
      <Calendar
        views={[ "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData.eventsData}
        className="custom-calendar" 
        onSelectEvent={(event) => handleClick(event)}
        eventPropGetter={eventPropGetter}  
        />
    </div>
  );
}
