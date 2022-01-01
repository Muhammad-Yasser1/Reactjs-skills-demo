import { NavLink } from 'react-router-dom';
import { mode } from '../../store/features/user/userSlice';
import './FloatingButton.scss';
interface Props {
	mode: mode;
}

const FloatingButton = (props: Props) => {
	return (
		<NavLink to='/articles/create' className='FloatingButton'>
			+
		</NavLink>
	);
};

export default FloatingButton;
