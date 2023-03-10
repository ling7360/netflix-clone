import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./Filter.module.css";

const Filter = (props) => {

    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            props.onFilter(keyword);
        }, 1000);
        return () => {
            clearTimeout(timer);
        }
    }, [keyword])

    const inputChangeHandler = (e) => {
        setKeyword(e.target.value.trim().toLowerCase());
        // props.onFilter(keyword);
    }

    return (
        <div className={classes.Filter}>
            <div className={classes.IptOuter}>
                <input
                    onChange={inputChangeHandler}
                    className={classes.SearchInput}
                    type="text"
                    placeholder={"Enter Keywords Here"}
                />
                <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
            </div>
        </div>
    )
}

export default Filter;