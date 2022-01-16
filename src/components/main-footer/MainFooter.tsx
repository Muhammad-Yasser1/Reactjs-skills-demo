import heartImg from '../../assets/images/heart.png';
import './MainFooter.scss';

function MainFooter() {
    return (
        <footer className="MainFooter text-center">
            <div className="MainFooter__content">
                Made with&nbsp;
                <img src={heartImg} className="img-fluid" alt="heart" />
                &nbsp;by
                <span> React</span> &amp;
                <span> Firebase</span>
            </div>
        </footer>
    );
}

export default MainFooter;
