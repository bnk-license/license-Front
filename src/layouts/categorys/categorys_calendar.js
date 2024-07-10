import PropTypes from "prop-types";
import styles from "./css/category.module.css";
import Category from "layouts/categorys/category";

function Categorys() {
  
    return (
        <div className={styles.categorys_wrap}>
            <ul className={styles.categorys_ul}>
            <Category item={"ALL"} selected={true}/>
            <Category item={"경영지원부"}/>
            <Category item={"전략기획부"}/>
            <Category item={"통합구매부"}/>
            

            </ul>
            <ul className={styles.categorys_ul}>
            <Category item={"서비스운영사업부"}/>
            <Category item={"인프라운영팀"}/>
            <Category item={"정보보호부"}/>
            <Category item={"UI&UX팀"}/>
            </ul>
        </div>
    );
}

Category.propTypes = {
    item: PropTypes.string.isRequired,
};

export default Categorys;
  