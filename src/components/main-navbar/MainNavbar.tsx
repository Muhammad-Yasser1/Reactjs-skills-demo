import { useNavigate } from 'react-router-dom';
import { notify } from 'reapop';
import { useAppDispatch } from '../../store';
import {
    mode,
    setMode,
    userActions,
} from '../../store/features/user/userSlice';
import localStorageApi from '../../store/features/user/localStorageApi';
import './MainNavbar.scss';

interface Props {
    mode: mode;
}

function MainNavbar(props: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const activateAdminMode = () => {
        dispatch(setMode('Admin'));
    };
    const activateReaderMode = () => {
        dispatch(setMode('Reader'));
    };
    const logout = () => {
        dispatch(userActions.signOut());
        dispatch(notify('You signed out successfully!', 'success'));
        localStorageApi.removeToken();
    };

    const handleNavigate = () => {
        if (window.location.pathname !== '/home') {
            navigate('/home');
        }
    };

    return (
        <header>
            <nav className="MainNavbar navbar navbar-expand">
                <button
                    type="button"
                    className="navbar-brand"
                    onClick={handleNavigate}
                >
                    Mo Blog
                </button>

                <ul className="navbar-nav">
                    <li className="btn-group">
                        <button
                            type="button"
                            className={`btn ${
                                props.mode === 'Admin'
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                            }`}
                            onClick={activateAdminMode}
                        >
                            Admin Mode
                        </button>
                        <button
                            type="button"
                            className={`btn ${
                                props.mode === 'Reader'
                                    ? 'btn-primary'
                                    : 'btn-secondary'
                            }`}
                            onClick={activateReaderMode}
                        >
                            Reader Mode
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavbar;
