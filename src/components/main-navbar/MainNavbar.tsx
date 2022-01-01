import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { mode, setMode } from '../../store/features/user/userSlice';
import './MainNavbar.scss';

interface Props {
	mode: mode;
}

const MainNavbar = (props: Props) => {
	const dispatch = useAppDispatch();
	const activateAdminMode = () => {
		dispatch(setMode('Admin'));
	};
	const activateReaderMode = () => {
		dispatch(setMode('Reader'));
	};

	return (
		<header>
			<nav className='MainNavbar navbar navbar-expand'>
				<NavLink className='navbar-brand' to='/'>
					Mo Blog
				</NavLink>
				<ul className='navbar-nav'>
					<li className='btn-group'>
						<button
							type='button'
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
							type='button'
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
				</ul>
			</nav>
		</header>
	);
};

export default MainNavbar;
