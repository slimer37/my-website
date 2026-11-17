import { Outlet, useLocation } from "react-router-dom";

import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Waves from './components/Waves.tsx'
import { lowerWaveLayers, lowerWavesHeight } from './data/waveLayers.ts'

function Root() {
  const isHome = useLocation().pathname === '/'

  return (
    <>
      {/* Every page but the home page (which has its own hero waves) gets waves about 80% of a screen height up from the bottom of the page */}
      {!isHome && (
        <div aria-hidden="true" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: lowerWavesHeight, zIndex: -500, overflow: 'hidden', pointerEvents: 'none' }}>
          <Waves layers={lowerWaveLayers} />
        </div>
      )}
      <Header shrinks={true} />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;