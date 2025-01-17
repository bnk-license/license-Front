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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import ReactBigCalendar from "layouts/calendar/ReactBigCalendar";

import Categorys from "layouts/categorys/categorys";
import { useEffect, useState } from "react";
import axios from "axios";
import MDInput from "components/MDInput";


function Dashboard() {
  const [barChart, setBarChart ] = useState(reportsBarChartData);
  const [lineChart, setLineChart ] = useState(reportsLineChartData);
  const [category, setCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState(''); 
  const [stats, setStats] = useState({licenseCount: 0, licenseCost: 0, notUsedLicenseCount: 0, notUsedLicenseCost: 0});
  const [eventsData, setEventsData] = useState([]);
  const [reportdata, setReportdata] = useState([]);
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleDateString();
  };

  const statsHandle = () => {
    axios
      .get("http://localhost:8080/api/v1/programInfo/header/"+category)
      .then((response) => {

        setStats(response.data.result);

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

      axios
      .get("http://localhost:8080/api/v1/programInfo/graph/"+category+"/2024")
      .then((response) => {

        const updatedBarChartData = JSON.parse(JSON.stringify(reportsBarChartData));
        const updatedLineChartData = JSON.parse(JSON.stringify(reportsLineChartData));

        console.log(reportsLineChartData);

        response.data.result.graphResponseDtoList.map((item, index) => {
          updatedBarChartData.datasets.data[item.month-1]=item.licenseCost;
          updatedLineChartData.datasets.data[item.month-1]=item.licenseCount;
        });

        setBarChart(updatedBarChartData);
        setLineChart(updatedLineChartData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

  };

  const seatHandle = () => {
    axios
      .get("http://localhost:8080/api/v1/programInfo/calender/"+category)
      .then((response) => {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const newEvents = response.data.result.calenderResponseDtoList.map((data) => {
          if(searchTerm != ""){
            const results = data.programName.toLowerCase().includes(searchTerm.toLowerCase())

            if(results){
              let licenseEndDate = data.licenseEndDate || "9999-12-31";
              const dateParts = licenseEndDate.split('-');
              const year = parseInt(dateParts[0], 10);
              const month = parseInt(dateParts[1], 10) - 1; // 월은 0부터 시작합니다.
              const day = parseInt(dateParts[2], 10);

              // 날짜 객체 생성
              const start = new Date(year, month, day);
              const end = new Date(year, month, day);

              return {
                start,
                end,
                title: data.programName,
                programInfoId: data.programInfoId,
              };
            }
          }
          else {
            let licenseEndDate = data.licenseEndDate || "9999-12-31";
            const dateParts = licenseEndDate.split('-');
            const year = parseInt(dateParts[0], 10);
            const month = parseInt(dateParts[1], 10) - 1; // 월은 0부터 시작합니다.
            const day = parseInt(dateParts[2], 10);

            // 날짜 객체 생성
            const start = new Date(year, month, day);
            const end = new Date(year, month, day);

            return {
              start,
              end,
              title: data.programName,
              programInfoId: data.programInfoId,
            };
          }
        });
        const filteredByMonth = newEvents.filter(item => item.end.getMonth() === currentMonth);
        setReportdata(filteredByMonth);
        setEventsData(newEvents);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };
  
  useEffect(() => {
    setEventsData([]);
    seatHandle();
    statsHandle();
  }, [category, searchTerm]);

  return (
    <DashboardLayout>
      <DashboardNavbar name={"중요정보 한눈에 보기"} searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        description ={stats}
        programinfos = {reportdata}
      />
      <div style={{}}>
      <Categorys category={category} setCategory={setCategory}/>
      </div>

      <div style={{width: "90%", marginLeft: "30px",padding: "10px"}}>
        <ReactBigCalendar category={category} eventsData={eventsData}/>
      </div>
      <h2 style={{marginLeft: "1%", marginTop: "2%", marginBottom:"1%"}}> 라이선스 통계 현황</h2>  
      {/* 부서 선택에 따라 단어가 달라져야함 */}
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={2}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="만료임박 제품개수"
                count={stats.licenseCount?(stats.licenseCount.toLocaleString()+"개"):"0개"}
                // percentage={{
                //   color: "success",
                //   amount: "+12%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="재구매시 지출예상비용"
                count={stats.licenseCost?((stats.licenseCost/1000).toLocaleString()+"천원"):"0원"}
                // percentage={{
                //   color: "success",
                //   amount: "+3%",
                //   label: "than last month",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="미사용 라이선스 개수"
                count={stats.notUsedLicenseCount?(stats.notUsedLicenseCount.toLocaleString()+"개"):"0개"}
                // percentage={{
                //   color: "success",
                //   amount: "+1%",
                //   label: "than yesterday",
                // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="절감가능비용"
                count={stats.notUsedLicenseCost?((stats.notUsedLicenseCost/1000).toLocaleString()+"천원"):"0원"}
                // percentage={{
                //   color: "success",
                //   amount: "",
                //   label: "Just updated",
                // }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="월별구매비용"
                  description="(단위:원)"
                  date={`${getCurrentTime()}`}
                  chart={barChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="월별구매개수"
                  description="(단위:개)"
                  date={`${getCurrentTime()}`}
                  chart={lineChart}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;