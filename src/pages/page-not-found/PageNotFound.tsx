import { Link } from 'react-router-dom';
import './PageNotFound.scss';

function PageNotFound() {
    return (
        <div className="PageNotFound">
            <h2>The Page you are looking for wasn&#39;t found</h2>
            <Link to="/home" className="btn btn-outline-primary">
                Return to Home
            </Link>
        </div>
    );
}

export default PageNotFound;
