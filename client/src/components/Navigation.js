import React from 'react';
import { useHistory } from 'react-router-dom';

function Navigation() {
    const history = useHistory();

    const goToCreatePage = () => {
        history.push('/create');
    }

    return (
        <nav>
            <div className="navButtons add" onClick={goToCreatePage}>
                <h4>Add</h4>
            </div>
            <div className="navButtons edit">
                <h4>Edit</h4>
            </div>
            <div className="navButtons remove">
                <h4>Remove</h4>
            </div>
        </nav>
    )
}

export default Navigation;
