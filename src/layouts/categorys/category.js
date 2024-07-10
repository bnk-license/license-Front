import PropTypes from "prop-types";
import styles from "./css/category.module.css";
<<<<<<< HEAD
function Category({ item, selected }) {
    return (
        <li className={selected ? styles.category_wrap_selected : styles.category_wrap}>
            {/* <img style={{height: "100%"}} src={all} alt="Brand"/> */}
            {/* <img style={{height: "70px"}} src={img} alt="Brand"/> */}
=======
function Category({ item }) {
  
    return (
        <li className={styles.category_wrap}>
            {/* <img style={{height: "100%"}} src={all} alt="Brand"/> */
             /* <img style={{height: "70px"}} src={img} alt="Brand"/> */
            }
>>>>>>> 807544fa3c7fd77693b772e264b0b62a3b9bf1aa
            {item}
        </li>
    );
}

Category.propTypes = {
    item: PropTypes.string.isRequired,
<<<<<<< HEAD
    selected: PropTypes.bool,
};

Category.defaultProps = {
    selected: false,
=======
>>>>>>> 807544fa3c7fd77693b772e264b0b62a3b9bf1aa
};

export default Category;
  