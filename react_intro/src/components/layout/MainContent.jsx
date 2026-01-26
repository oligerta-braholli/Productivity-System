import './MainContent.css';

/**
 * MainContent Component
 * Huvudinnehålls-område för applikationen
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Sidans innehål
 * @param {boolean} [props.sidebarOpen=false] - Är sidebaren öppen (för overlay på mobile)
 * 
 * @example
 * <MainContent>
 *   <h1>Innehål här</h1>
 * </MainContent>
 */
export function MainContent({ children, sidebarOpen = false }) {
  return (
    <main className={`main-content ${sidebarOpen ? 'main-content--sidebar-open' : ''}`}>
      {children}
    </main>
  );
}

export default MainContent;
