import st from "./style.module.scss";
import axios from "axios";
import { basedURL } from "../../../basedURL";
import { useSelector } from "react-redux";
import { useState } from "react";

const UserInfo = () => {
    const [isInfoLoad, setInfoLoad] = useState(false);
    const [usedCompany, setUsedCompany] = useState('');
    const [companyLimit, setCompanyLimit] = useState('');
    const token = useSelector(state => state.user.user.accessToken);

    axios.get(basedURL + "/api/v1/account/info", {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    .then((response) => {
        setUsedCompany(response.data.eventFiltersInfo.usedCompanyCount);
        setCompanyLimit(response.data.eventFiltersInfo.companyLimit);
        setInfoLoad(true);
    })
    .catch((error) => {
        console.error(error);
    })

    if (isInfoLoad) {
        return (
            <div className={st.header__userinfo}>
                <p className={st.header__userinfo_text}>
                    Использовано компаний 
                    <span style={{color: "black", fontSize:"16px"}}>{usedCompany}</span>
                </p>
                <p className={st.header__userinfo_text}>
                    Лимит по компаниям 
                    <span style={{color: "#8AC540", fontSize:"16px"}}>{companyLimit}</span>
                </p>
            </div>
        )
    } else {
        return (
            <div className={st.header__userinfo}>
                <span className={st.loader}></span>
            </div>
        )
    }
}

export default UserInfo;