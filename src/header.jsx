import React from 'react';
import { Menu } from 'semantic-ui-react';

export default () => {
    return(
        <Menu style={{marginTop: "10px"}}>
            <a className="item">Countries</a>
            <Menu.Menu position="right">
                <a className="item">Dream List</a>
            </Menu.Menu>
        </Menu>

    )
}