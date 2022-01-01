import heartImg from '../../assets/images/heart.png';
import './MainFooter.scss';
const MainFooter = () => {
	return (
		<footer className='text-center p-4 p-sm-5'>
			<hr className='mb-4' />
			Made with&nbsp;
			<img src={heartImg} className='img-fluid' alt='heart' />
			&nbsp;by
			<span> React</span> &amp;
			<span> Firebase</span>
		</footer>
	);
};

export default MainFooter;
