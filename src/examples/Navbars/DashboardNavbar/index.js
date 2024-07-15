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

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import MDButton from "components/MDButton";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import malgunFontBase64 from "assets/font/malgun";

function DashboardNavbar({ absolute, light, isMini, name, searchTerm, setSearchTerm, description, programinfos }) {
  const [navbarType, setNavbarType] = useState();
  const [text, setText] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
 

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleSearch = () => {
    setSearchTerm(text);
  };


  const createPdf = (malgunFont) => {
    const doc = new jsPDF('p', 'mm', 'a4');

    if (malgunFont) {
      // Add custom font
      doc.addFileToVFS('malgun.ttf', malgunFont);
      doc.addFont('malgun.ttf', 'malgun', 'normal');
      doc.setFont('malgun');

      // Title
      const title = '월간 라이선스 보고서';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleXPos = (pageWidth - titleWidth) / 2;
      doc.text(title, titleXPos, 30);

      // 요약 정보 테이블
      doc.text("요약 정보", 10, 50); // Adjust vertical position as needed
      doc.autoTable({
        headStyles: {
          halign: 'center',
          valign: 'middle',
          fillColor: [215, 25, 31] // Header background color
        },
        startY: 60,
        margin: { left: 10, top: 10, right: 10 },
        tableWidth: "100%",
        styles: { font: 'malgun', fontStyle: 'normal' },
        head: [['만료임박 제품개수', '재구매시 지출 예상비용', '미사용 라이선스 개수','절감 가능 비용']],
        body: [
          [{ content: '데이터1', styles: { halign: 'center' } },
            { content: '데이터2', styles: { halign: 'center' } },
            { content: '데이터3', styles: { halign: 'center' } },
            { content: '데이터4', styles: { halign: 'center' } }]
        ]
      });

      // 라이선스 정보 테이블
      const summaryTableHeight = doc.previousAutoTable.finalY + 10; // Calculate the height of the previous table
      doc.text("프로그램 정보", 10, summaryTableHeight + 20); // Adjust vertical position as needed
      doc.autoTable({
        headStyles: {
          halign: 'center',
          valign: 'middle',
          fillColor: [215, 25, 31] // Header background color
        },
        startY: summaryTableHeight + 30,
        margin: { left: 10, top: 10, right: 10 },
        tableWidth: "100%",
        styles: { font: 'malgun', fontStyle: 'normal' },
        head: [['프로그램 명', '보유수량', '사용수량', '개당금액(단위:원)']],
        body: [
          [{ content: '데이터1', styles: { halign: 'center' } },
          { content: '데이터2', styles: { halign: 'center' } },
          { content: '데이터3', styles: { halign: 'center' } },
          { content: '데이터4', styles: { halign: 'center' } }]
        ]
      });

      // Save the PDF
      doc.save('example.pdf');
    } else {
      console.error('Font could not be loaded');
    }
  } 

  useEffect(() => {
    
  }, [])

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={name} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pt={3} pb={3} px={3} display="flex" alignItems="center">
              <MDInput
                label="Search here"
                value={text}
                onChange={(e) => setText(e.target.value)} // 검색 입력 상태 업데이트
                fullWidth
              />
              <MDButton 
                variant="gradient" 
                color="info" 
                onClick={handleSearch} 
                style={{ marginLeft: "10px" }}
              >
                Search
              </MDButton>
              <MDButton 
                variant="gradient" 
                color="info" 
                style={{ marginLeft: "10px" }}
                onClick={() => createPdf(malgunFontBase64)}
              >
                download
              </MDButton>
            </MDBox>
            {/* <MDBox color={light ? "white" : "inherit"}>
              <Link to="/authentication/sign-in/basic">
                <IconButton sx={navbarIconButton} size="small" disableRipple>
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleConfiguratorOpen}
              >
                <Icon sx={iconsStyle}>settings</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              {renderMenu()}
            </MDBox> */}
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  name : PropTypes.string,
  searchTerm: PropTypes.string,
  setSearchTerm: PropTypes.string,
  description : PropTypes.object,
  programinfos : PropTypes.object,
};

export default DashboardNavbar;
