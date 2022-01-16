import { useEffect } from 'react';
import nprogress from 'nprogress';
import NotificationsSystem, {
    atalhoTheme,
    dismissNotification,
    setUpNotifications,
} from 'reapop';
import { useAppDispatch, useAppSelector } from './store';
import { fetchAllArticles } from './store/features/articles/articlesActions';
import 'nprogress/nprogress.css';

import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
    const dispatch = useAppDispatch();
    const notifications = useAppSelector((state) => state.notifications);
    const articlesLoading = useAppSelector(
        (state) => state.articlesReducer.loading
    );
    const userLoading = useAppSelector((state) => state.userReducer.loading);
    const loading = articlesLoading || userLoading;
    const token = useAppSelector((state) => state.userReducer.token);

    useEffect(() => {
        setUpNotifications({
            defaultProps: {
                position: 'top-right',
                dismissible: true,
            },
        });
        if (token) {
            dispatch(fetchAllArticles());
        }
    }, [dispatch, token]);

    useEffect(() => {
        if (loading) {
            nprogress.start();
        } else {
            nprogress.done();
        }
    }, [loading]);

    return (
        <>
            <NotificationsSystem
                notifications={notifications}
                dismissNotification={(id) => dispatch(dismissNotification(id))}
                theme={atalhoTheme}
            />
            <AppRoutes />
        </>
    );
}

export default App;
