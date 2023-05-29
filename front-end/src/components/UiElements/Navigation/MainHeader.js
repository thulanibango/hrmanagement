import React from 'react';

import './MainHeader.css';

const MainHeader = props => {

  return <header className="main-header">
    {/* output from the Main Navigation as children */}
    {props.children}
    </header>;
};

export default MainHeader;



