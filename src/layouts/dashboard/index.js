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


function Dashboard() {
  const [ barChart, setBarChart ] = useState(reportsBarChartData);
  const [ lineChart, setLineChart ] = useState(reportsLineChartData);
  const [category, setCategory] = useState(0);
  const [stats, setStats] = useState({licenseCount: 0, licenseCost: 0, notUsedLicenseCount: 0, notUsedLicenseCost: 0});

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleDateString();
  };

  const statsHandle = () => {
    axios
      .get("http://localhost:8080/api/v1/programInfo/header/"+category)
      .then((response) => {

        console.log(response.data.result);
        setStats(response.data.result);

      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });

      axios
      .get("http://localhost:8080/api/v1/programInfo/graph/"+category+"/2024")
      .then((response) => {
        
        console.log(response.data.result);
        console.log(reportsLineChartData.datasets.data);

        const updatedBarChartData = { ...reportsBarChartData };
        const updatedLineChartData = { ...reportsLineChartData };

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
  
  useEffect(() => {
    statsHandle();
  }, [category]);

  return (
    <DashboardLayout>
      <DashboardNavbar name={"중요정보 한눈에 보기"}/>
      <div style={{}}>
      <Categorys category={category} setCategory={setCategory}/>
      </div>

      <div style={{width: "90%", marginLeft: "30px",padding: "10px"}}>
        <ReactBigCalendar category={category}/>
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
                count={stats.licenseCost?(stats.licenseCost.toLocaleString()+"원"):"0원"}
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
                count={stats.notUsedLicenseCost?(stats.notUsedLicenseCost.toLocaleString()+"원"):"0원"}
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
                  title="Expired License Cost"
                  description="Licenses Expiring by Month"
                  date={`${getCurrentTime()}`}
                  chart={barChart}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="success"
                  title="Expired License Count"
                  description={
                    <>
                      {/* (<strong>+15%</strong>)  */}
                      Licenses Expiring by Month
                    </>
                  }
                  date={`${getCurrentTime()}`}
                  chart={lineChart}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;