import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './header';
import '../styles/Layout.css';

function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-wrapper">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
