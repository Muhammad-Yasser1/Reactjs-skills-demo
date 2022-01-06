import { createPortal } from 'react-dom';
import { Location, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FloatingButton from '../../components/floating-button/FloatingButton';
import MainFooter from '../../components/main-footer/MainFooter';
import MainNavbar from '../../components/main-navbar/MainNavbar';
import Modal from '../../components/Modal/Modal';
import { useAppSelector } from '../../store';
import './MainLayout.scss';
interface Props {
	location: Location;
}

const MainLayout = (props: Props) => {
	const mode = useAppSelector((state) => state.userReducer.mode);
	return (
		<>
			<MainNavbar mode={mode} />
			{mode !== 'Reader' && <FloatingButton mode={mode} />}
			{createPortal(<Modal mode={mode} />, document.getElementById('modal-container') as HTMLDivElement)}
			<TransitionGroup>
				<CSSTransition key={props.location.pathname} classNames='fade' timeout={400}>
					<main className='container-fluid'>
						<Outlet />
					</main>
				</CSSTransition>
			</TransitionGroup>
			<MainFooter />
		</>
	);
};

export default MainLayout;
