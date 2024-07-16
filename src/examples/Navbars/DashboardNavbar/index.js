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
import axios from "axios";
import { useRef } from "react";

function DashboardNavbar({ absolute, light, isMini, name, searchTerm, setSearchTerm, description, programinfos }) {
  const [navbarType, setNavbarType] = useState();
  const [text, setText] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [newLicenseCount, setNewLicenseCount] = useState(0);
  const [newLicenseCost, setNewLicenseCost] = useState(0);
  const [newNotUsedLicenseCount, setNotUsedLicenseCount] = useState(0);
  const [newNotUsedLicenseCost, setNewNotUsedLicenseCost] = useState(0);
  const [programInfos, setProgramInfos] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false); // 상태 업데이트 완료 확인용

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);

    handleTransparentNavbar();

    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

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

  const getProgramInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/programInfo/programInfo/${id}`);

      setNewLicenseCount((prevCount) => prevCount + response.data.result.quantityCount);
      setNewLicenseCost((prevCost) => prevCost + response.data.result.quantityCount * response.data.result.price);
      setNotUsedLicenseCount((prevCount) => prevCount + response.data.result.usedCount);
      setNewNotUsedLicenseCost((prevCost) => prevCost + response.data.result.usedCount * response.data.result.price);

      return [
        { content: response.data.result.programName || '', styles: { halign: 'center' } },
        { content: response.data.result.quantityCount || '', styles: { halign: 'center' } },
        { content: response.data.result.usedCount || '0', styles: { halign: 'center' } },
        { content: response.data.result.price || '', styles: { halign: 'center' } },
      ];
    } catch (error) {
      console.error('Error fetching data: ', error);
      return [];
    }
  };

  const fetchProgramInfos = async (programinfos) => {
    try {
      const promises = programinfos.map((data) => getProgramInfo(data.programInfoId));
      const results = await Promise.all(promises);
      setProgramInfos(results);
      setIsDataFetched(true); // 상태 업데이트 완료 표시
    } catch (error) {
      console.error('Error fetching program infos: ', error);
      setIsDataFetched(true); // 상태 업데이트 실패 시에도 완료 표시
    }
  };

  const createPdf = (malgunFont) => {
    if (!isDataFetched) {
      console.error('Data is not yet fetched');
      return;
    }

    const doc = new jsPDF('p', 'mm', 'a4');

    if (malgunFont) {
      doc.addFileToVFS('malgun.ttf', malgunFont);
      doc.addFont('malgun.ttf', 'malgun', 'normal');
      doc.setFont('malgun');

      const title = '월간 라이선스 보고서';
      const titleWidth = doc.getTextWidth(title);
      const pageWidth = doc.internal.pageSize.getWidth();
      const titleXPos = (pageWidth - titleWidth) / 2;
      doc.text(title, titleXPos, 30);

      doc.text('요약 정보', 10, 50);
      doc.autoTable({
        headStyles: {
          halign: 'center',
          valign: 'middle',
          fillColor: [215, 25, 31],
        },
        startY: 60,
        margin: { left: 10, top: 10, right: 10 },
        tableWidth: '100%',
        styles: { font: 'malgun', fontStyle: 'normal' },
        head: [['만료임박 제품개수', '재구매시 지출 예상비용', '미사용 라이선스 개수', '절감 가능 비용']],
        body: [
          [
            { content: `${newLicenseCount}개`, styles: { halign: 'center' } },
            { content: `${newLicenseCost.toLocaleString()}원`, styles: { halign: 'center' } },
            { content: `${newNotUsedLicenseCount}개`, styles: { halign: 'center' } },
            { content: `${newNotUsedLicenseCost.toLocaleString()}원`, styles: { halign: 'center' } },
          ],
        ],
      });

      const summaryTableHeight = doc.previousAutoTable.finalY + 10;
      doc.text('프로그램 정보', 10, summaryTableHeight + 20);
      doc.autoTable({
        headStyles: {
          halign: 'center',
          valign: 'middle',
          fillColor: [215, 25, 31],
        },
        startY: summaryTableHeight + 30,
        margin: { left: 10, top: 10, right: 10 },
        tableWidth: '100%',
        styles: { font: 'malgun', fontStyle: 'normal' },
        head: [['프로그램 명', '보유수량', '사용수량', '개당금액']],
        body: programInfos,
      });

      doc.save('TLMS report.pdf');
    } else {
      console.error('Font could not be loaded');
    }
  };

  useEffect(() => {
    setNewLicenseCount(0);
    setNewLicenseCost(0);
    setNotUsedLicenseCount(0);
    setNewNotUsedLicenseCost(0);
    fetchProgramInfos(programinfos); // 프로그램 정보를 가져옴
  }, [programinfos]);

  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={name} route={route} light={light} />
        </MDBox>
        <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
          <MDBox pr={1}>
            <MDInput
              label="검색어를 입력하세요"
              placeholder="ex) 프로그래밍"
              size="small"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </MDBox>
          <MDBox pr={1}>
            <MDButton variant="gradient" color="info" size="small" onClick={handleSearch}>
              검색
            </MDButton>
          </MDBox>
          <MDBox pr={1}>
            <MDButton
              variant="gradient"
              color="info"
              size="small"
              onClick={() => createPdf(malgunFontBase64)}
            >
              PDF 다운로드
            </MDButton>
          </MDBox>
          <MDBox color={light ? 'white' : 'inherit'}>
            <IconButton
              size="small"
              disableRipple
              color="inherit"
              sx={navbarMobileMenu}
              onClick={handleMiniSidenav}
            >
              <Icon sx={iconsStyle}>menu</Icon>
            </IconButton>
            {/* <IconButton
              size="small"
              disableRipple
              color="inherit"
              sx={navbarIconButton}
              onClick={handleConfiguratorOpen}
            >
              <Icon sx={iconsStyle}>settings</Icon>
            </IconButton> */}
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
          </MDBox>
        </MDBox>
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
  description : PropTypes.shape({
    licenseCount: PropTypes.number,
    licenseCost: PropTypes.number,
    notUsedLicenseCount: PropTypes.number,
    notUsedLicenseCost: PropTypes.number,
  }),
  programinfos : PropTypes.object,
};

export default DashboardNavbar;
