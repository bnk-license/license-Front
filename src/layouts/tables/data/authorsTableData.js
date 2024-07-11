/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function data() {

  const [eventsData, setEventsData] = useState([]);
  const [rows, setRows] = useState([]);
  
  const seatHandle = () => {
    axios
      .get("http://localhost:8080/api/v1/programInfo/table")
      .then((response) => {
        // API 응답에서 result 안의 tableResponseDtoList를 eventsData로 설정
        setEventsData(response.data.result.tableResponseDtoList);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  
  useEffect(() => {
    seatHandle();
  }, []);
  
  useEffect(() => {
    // eventsData가 업데이트될 때만 실행되도록 useEffect 안에 추가
    if (eventsData.length > 0) {
      const newRows = eventsData.map((data, index) => ({
        title: <Author name={data.programName} />,
        count: <Job title={data.quantityCount} />,
        use: data.used ? (
                <MDBox ml={-1}>
                  <MDBadge badgeContent="사용" color="success" variant="gradient" size="sm" />
                </MDBox>
              ) : (
                <MDBox ml={-1}>
                  <MDBadge badgeContent="미사용" color="dark" variant="gradient" size="sm" />
                </MDBox>
              ), // 이 부분에서 오타 수정 (data.used)
        manager: (<Job title={data.departmentName} description="" />),
        date: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {data.introductionDate}
                </MDTypography>
              ),
        company: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                  {data.supplierName}
                </MDTypography>
              ),
        expiration: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">{data.licenseEndDate}</MDTypography>),
      }));
      setRows(newRows);
    }
  }, [eventsData]);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "프로그램명", accessor: "title", align: "left" },
      { Header: "수량", accessor: "count", align: "left" },
      { Header: "사용여부", accessor: "use", align: "center" },
      { Header: "사용담당자", accessor: "manager", align: "center" },
      { Header: "최초구매/도입(검수)일", accessor: "date", align: "center" },
      { Header: "납품/판매업체", accessor: "company", align: "center" },
      { Header: "계약(유효)기간", accessor: "expiration", align: "center" },
    ],

    // rows: [
    //   {
    //     title: <Author name="windows_Server_2008_R2_STD" />,
    //     count: <Job title="15" />,
    //     use: (
    //       <MDBox ml={-1}>
    //         <MDBadge badgeContent="사용" color="success" variant="gradient" size="sm" />
    //       </MDBox>
    //     ),
    //     manager: <Job title="전근우 파트너" description="" />,
    //     date: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         23/04/18
    //       </MDTypography>
    //     ),
    //     company: (
    //       <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //         밴투스
    //       </MDTypography>
    //     ),
    //     expiration: <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
    //     24/04/18
    //   </MDTypography>,
    //   }
    // ],

    rows: rows
  };
}
