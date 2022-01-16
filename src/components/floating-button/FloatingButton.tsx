import { NavLink } from 'react-router-dom';
import './FloatingButton.scss';

function FloatingButton() {
    return (
        <NavLink to="/articles/create" className="FloatingButton">
            +
        </NavLink>
    );
}

export default FloatingButton;
