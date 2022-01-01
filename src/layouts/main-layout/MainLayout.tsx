import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';
import FloatingButton from '../../components/floating-button/FloatingButton';
import MainFooter from '../../components/main-footer/MainFooter';
import MainNavbar from '../../components/main-navbar/MainNavbar';
import Modal from '../../components/Modal/Modal';
import { useAppSelector } from '../../store';

const MainLayout = () => {
	const mode = useAppSelector((state) => state.userReducer.mode);
	return (
		<>
			<MainNavbar mode={mode} />
			{mode !== 'Reader' && <FloatingButton mode={mode} />}
			{createPortal(
				<Modal mode={mode} />,
				document.getElementById('modal-container') as HTMLDivElement
			)}
			<main className='container-fluid'>
				<Outlet />
			</main>
			<MainFooter />
		</>
	);
};

export default MainLayout;
