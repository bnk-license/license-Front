import PropTypes from "prop-types";
import styles from "./css/category.module.css";
function Category({ item, id, setCategory,selected }) {

    return (
        <li onClick={() => setCategory(id)} className={selected ? styles.category_wrap_selected : styles.category_wrap}>
            {/* <img style={{height: "100%"}} src={all} alt="Brand"/> */}
            {/* <img style={{height: "70px"}} src={img} alt="Brand"/> */}
            {item}
        </li>
    );
}

Category.propTypes = {
    item: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    setCategory: PropTypes.string.isRequired,
    selected: PropTypes.bool,
};

Category.defaultProps = {
    selected: false,
};

export default Category;
  