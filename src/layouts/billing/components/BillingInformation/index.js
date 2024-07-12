import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@mui/material";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import Bill from "layouts/billing/components/Bill";
import { useParams } from "react-router-dom";

function BillingInformation(programInfoId) {
  const [licenseList, setLicenseList] = useState([]);
  const { id } = useParams();

  const getLicenseList = () => {
    axios
      .get("http://localhost:8080/api/v1/licenseInfo/licenseInfo/" + id)
      .then((response) => {
        console.log("" + response.data.result.licenseInfoResponseDtoList);
        setLicenseList(response.data.result.licenseInfoResponseDtoList);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    getLicenseList();
  }, []);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          라이선스 정보
        </MDTypography>
        <MDButton variant="gradient" color="dark">
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          &nbsp;ADD
        </MDButton>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {licenseList.map((data, index) => (
            <Bill key={index} name={data.hostName} company={data.hostIp} email={data.purpose} />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
