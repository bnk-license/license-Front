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

function PaymentMethod(programInfoId) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const [useName, setUseName] = useState(); 
  const [useProductName, setUseProductName] = useState(); 
  const { id } = useParams();

  const { darkMode } = controller;

  const customModalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      width: "100%",
      height: "100vh",
      zIndex: "10",
      position: "fixed",
      top: "0",
      left: "0",
    },
    content: {
      width: "500px",
      height: "524px",
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


  const getUseProductName = () => {
    axios
    .get("http://localhost:8080/api/v1/programInfo/useProductName/" + id)
    .then((response) => {

      setUseProductName(response.data.result.useProductName); 

    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }


  const getUseName = () => {
    axios
    .get("http://localhost:8080/api/v1/programInfo/useName/" + id)
    .then((response) => {
      setUseName(response.data.result.useName); 

    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };


  useEffect(() => {
    getUseName();
    getUseProductName();
  },[]);

  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          계약 정보 
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox fontWeight="medium" width="15%" mr={2}>
                계약명
              </MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                {useName}
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={openModal}>
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MDBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
              sx={{
                border: ({ borders: { borderWidth, borderColor } }) =>
                  `${borderWidth[1]} solid ${borderColor}`,
              }}
            >
              <MDBox fontWeight="medium" width="15%" mr={2}>
                제품명
              </MDBox>
              <MDTypography variant="h6" fontWeight="medium">
                {useProductName}
              </MDTypography>
              <MDBox ml="auto" lineHeight={0} color={darkMode ? "white" : "dark"}>
                <Tooltip title="Edit Card" placement="top">
                  <Icon sx={{ cursor: "pointer" }} fontSize="small" onClick={openModal}>
                    edit
                  </Icon>
                </Tooltip>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        sx={{ ...customModalStyles.overlay }}
      >
        <Box sx={{ ...customModalStyles.content }}>
        <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                저장
              </MDButton>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="secondary" fullWidth onClick={closeModal}>
                닫기
              </MDButton>
            </MDBox>  
          </MDBox>
        </MDBox>
      </Card>
        </Box>
      </Modal>
    </Card>
  );
}

export default PaymentMethod;
