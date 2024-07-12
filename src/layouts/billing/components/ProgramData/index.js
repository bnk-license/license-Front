import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function ProgramData({ noGutter, programName, supplierName, quantityCount,
     usedCount, used, introductionDate, price, maintenanceContract,
     maintenanceFee, maintenanceStartDate, maintenanceEndDate,
     licenseBuyDate, licenseEndDate, licenseStorageMethod, note
    }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  console.log(name);

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {programName}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            납품업체:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {supplierName}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            보유수량 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {quantityCount}
            </MDTypography>
          </MDTypography>
        </MDBox>


        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            사용수량 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {usedCount}
            </MDTypography>
          </MDTypography>
        </MDBox>
        {/* <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            사용여부 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {used}
            </MDTypography>
          </MDTypography>
        </MDBox> */}
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            도입일(최초구매일) :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {introductionDate}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            가격 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {price}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            유지보수 비용 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {maintenanceFee}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            유지보수 기간 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {maintenanceStartDate}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            라이선스 기간 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {licenseBuyDate}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            라이선스 보관방법 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {licenseStorageMethod}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            비고 :&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {note}
            </MDTypography>
          </MDTypography>
        </MDBox>


      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
ProgramData.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
ProgramData.propTypes = {
  programName: PropTypes.string,
  supplierName: PropTypes.string,
  quantityCount: PropTypes.string,
  usedCount: PropTypes.number,
  used: PropTypes.bool.isRequired,
  introductionDate: PropTypes.string,
  price:PropTypes.number,
  maintenanceContract: PropTypes.bool,
  maintenanceFee:PropTypes.number,
  maintenanceStartDate: PropTypes.string,
  maintenanceEndDate: PropTypes.string,
  licenseBuyDate: PropTypes.string,
  licenseEndDate: PropTypes.string,
  licenseStorageMethod:PropTypes.string,
  note:PropTypes.string,
  noGutter: PropTypes.bool,
};

export default ProgramData;