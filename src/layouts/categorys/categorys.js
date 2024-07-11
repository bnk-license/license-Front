import PropTypes from "prop-types";
import styles from "./css/category.module.css";
import Category from "layouts/categorys/category";
import { useEffect, useState } from "react";

function Categorys({category, setCategory}) {
    
  
    return (
        <div className={styles.categorys_wrap}>
            <ul className={styles.categorys_ul}>
            <Category item={"ALL"} id="0" setCategory={setCategory} selected={category==0}/>
            <Category item={"OS"} id="1" setCategory={setCategory} selected={category==1}/>
            <Category item={"DBMS"} id="2" setCategory={setCategory} selected={category==2}/>
            <Category item={"관리도구"} id="3" setCategory={setCategory} selected={category==3}/>
            <Category item={"Document"} id="4" setCategory={setCategory} selected={category==4}/>
            <Category item={"WEB/WAS"} id="5" setCategory={setCategory} selected={category==5}/>
            <Category item={"도메인"} id="6" setCategory={setCategory} selected={category==6}/>
            <Category item={"디자인"} id="7" setCategory={setCategory} selected={category==7}/>
            <Category item={"가상화"} id="8" setCategory={setCategory} selected={category==8}/>
            </ul>
            <ul className={styles.categorys_ul}>
            <Category item={"개발도구"} id="9" setCategory={setCategory} selected={category==9}/>
            <Category item={"유틸"} id="10" setCategory={setCategory} selected={category==10}/>
            <Category item={"보안"} id="11" setCategory={setCategory} selected={category==11}/>
            <Category item={"솔루션"} id="12" setCategory={setCategory} selected={category==12}/>
            <Category item={"인증서"} id="13" setCategory={setCategory} selected={category==13}/>
            <Category item={"스크래핑"} id="14" setCategory={setCategory} selected={category==14}/>
            <Category item={"Agent"} id="15" setCategory={setCategory} selected={category==15}/>
            <Category item={"인프라"} id="16" setCategory={setCategory} selected={category==16}/>
            <Category item={"모니터링"} id="17" setCategory={setCategory} selected={category==17}/>
            </ul>
        </div>
    );
}

Categorys.propTypes = {
    item: PropTypes.string.isRequired,
    setCategory: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
};

export default Categorys;
  