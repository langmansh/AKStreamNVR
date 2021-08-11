import React from 'react';
import Exception from "../../component/Exception/Exception";
import {Link} from "react-router-dom";

export default () => (
    <Exception type="404" style={{minHeight: 500, height: '80%'}} linkElement={Link}/>
);
