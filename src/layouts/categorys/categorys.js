import PropTypes from "prop-types";
import styles from "./css/category.module.css";
import Category from "layouts/categorys/category";

function Categorys() {
  
    return (
        <div className={styles.categorys_wrap}>
            <ul className={styles.categorys_ul}>
            <Category item={"ALL"} selected={true}/>
            <Category item={"OS"}/>
            <Category item={"DBMS"}/>
            <Category item={"관리도구"}/>
            <Category item={"Document"}/>
            <Category item={"WEB/WAS"}/>
            <Category item={"도메인"}/>
            <Category item={"디자인"}/>
            <Category item={"가상화"}/>
            </ul>
            <ul className={styles.categorys_ul}>
            <Category item={"개발도구"}/>
            <Category item={"유틸"}/>
            <Category item={"보안"}/>
            <Category item={"솔루션"}/>
            <Category item={"인증서"}/>
            <Category item={"스크래핑"}/>
            <Category item={"Agent"}/>
            <Category item={"인프라"}/>
            <Category item={"모니터링"}/>
            </ul>
        </div>
    );
}

Category.propTypes = {
    item: PropTypes.string.isRequired,
};

export default Categorys;
  