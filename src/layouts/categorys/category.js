import PropTypes from "prop-types";
import styles from "./css/category.module.css";
function Category({ item }) {
  
    return (
        <li className={styles.category_wrap}>
            {/* <img style={{height: "100%"}} src={all} alt="Brand"/> */
             /* <img style={{height: "70px"}} src={img} alt="Brand"/> */
            }
            {item}
        </li>
    );
}

Category.propTypes = {
    item: PropTypes.string.isRequired,
};

export default Category;
  