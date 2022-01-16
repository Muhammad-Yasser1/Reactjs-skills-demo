import { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AnimatedRoutes({
    children,
    timeout = 400,
    classNames = 'fade',
}: PropsWithChildren<{ timeout?: number; classNames?: string }>) {
    const location = useLocation();
    return (
        <TransitionGroup>
            <CSSTransition
                key={location.pathname}
                classNames={classNames}
                timeout={timeout}
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
}

export default AnimatedRoutes;
