import { Outlet, useLocation } from "react-router-dom";

import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import ccPersonDead from './assets/images/fun/ccperson-dead-cutout.png'
import ScrollThumb from './components/ScrollThumb.tsx'
import Waves from './components/Waves.tsx'
import { lowerWaveLayers, lowerWavesHeight } from './data/waveLayers.ts'

function Root() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

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
      <Footer>
        {pathname === '/games' && <img className="footer-decoration" src={ccPersonDead} alt="" />}
      </Footer>
      <ScrollThumb />
    </>
  );
}

export default Root;