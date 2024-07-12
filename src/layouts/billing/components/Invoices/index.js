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

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Billing page components
import Invoice from "layouts/billing/components/Invoice";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Invoices(programInfoId) {

  const [departmentList, setDepartmentList] = useState([]); 
  const [invoice, setInvoice] = useState([]); 

  const getDepartmentList = () => {
    axios
    .get("http://localhost:8080/api/v1/programInfo/department/" + 55)
    // .get("http://localhost:8080/api/v1/programInfo/department"+ programInfoId)
    .then((response) => {

      console.log(""+ response.data.result.departmentResponseDtoList)
      setDepartmentList(response.data.result.departmentResponseDtoList); 

    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  useEffect(() => {
    getDepartmentList()
  },[]);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          부서 정보
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;ADD
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {departmentList.map((data, index) => (
            <Invoice key={index} date={data.departmentName} id={data.managerName} />
          ))}
          {/* <Invoice date="March, 01, 2020" id="#MS-415646" price="$180" />
          <Invoice date="February, 10, 2021" id="#RV-126749" price="$250" />
          <Invoice date="April, 05, 2020" id="#QW-103578" price="$120" />
          <Invoice date="June, 25, 2019" id="#MS-415646" price="$180" />
          <Invoice date="March, 01, 2019" id="#AR-803481" price="$300" noGutter /> */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
