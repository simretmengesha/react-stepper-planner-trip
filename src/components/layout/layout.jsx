import PropTypes from 'prop-types';
import '../../styles/layout.scss';

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <header className="layout-header">
                <h1>Trip Planner</h1>
            </header>
            <main className="layout-main">
                {children}
            </main>
            <footer className="layout-footer">
                <p>&copy; 2024 Trip Planner</p>
            </footer>
        </div>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;