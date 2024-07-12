import React from 'react'
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useMaterialUIController } from "context";  
import { Modal, Box, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import axios from "axios";
import { useParams } from "react-router-dom";
import Bill from "layouts/billing/components/Bill";
import ProgramData from '../ProgramData';

function ProgramInfo() {

    const [programInfo, setProgramInfo] = useState([]);
    const { id } = useParams();
  
    const getLicenseList = () => {
      axios
        .get("http://localhost:8080/api/v1/programInfo/programInfo/" + id)
        .then((response) => {
          console.log("" + response.data.result);
          setProgramInfo(response.data.result);
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
          프로그램 정보
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
            <ProgramData programName={programInfo.programName}
                supplierName={programInfo.supplierName}
                quantityCount={programInfo.quantityCount}
                usedCount={programInfo.usedCount}
                introductionDate={programInfo.introductionDate}
                price={programInfo.price}
                maintenanceFee={programInfo.maintenanceFee}
                maintenanceStartDate={programInfo.maintenanceStartDate}
                licenseBuyDate={programInfo.licenseBuyDate + " ~ " + programInfo.licenseEndDate}
                licenseStorageMethod={programInfo.licenseStorageMethod}
                note={programInfo.note}

            />
        </MDBox>
      </MDBox>
    </Card>
  )
}
export default ProgramInfo;
