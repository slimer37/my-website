import { NavLink, useLocation } from 'react-router-dom'

import './Header.css'
import { useEffect, useState } from 'react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/games', label: 'Games' },
  { to: '/projects', label: 'Projects' },
  { to: '/art', label: 'Art' },
]

function NavButtonStyle(isActive: boolean) {
  return "nav-btn" + (isActive ? " active" : "");
}

type HeaderProps = {
  shrinks?: boolean;
}

function Header({ shrinks = false }: HeaderProps) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const currentLabel = navLinks.find(l => l.to === pathname)?.label ?? ''

  // On narrow screens the links collapse into a menu: close it on navigation, Escape, or a click outside
  useEffect(() => setMenuOpen(false), [pathname])
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    const onPointerDown = (e: PointerEvent) => {
      if (!(e.target as Element).closest('.header-group')) setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('pointerdown', onPointerDown)
    }
  }, [menuOpen])

  useEffect(() => {
    const header = document.getElementById('header')
    if (!shrinks) {
      header?.setAttribute('style', 'position: absolute')
      return
    }
    window.addEventListener('scroll', shrinkWhenScrolled)
    shrinkWhenScrolled()
    return () => window.removeEventListener('scroll', shrinkWhenScrolled)
  }, [shrinks])

  return (
    <header id="header">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <div className="header-group">
        <span className="header-current" aria-hidden="true">{currentLabel}</span>
        <button type="button" className="menu-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(o => !o)}>
          <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
        </button>
        <nav id="site-nav" className={'nav-btn-group' + (menuOpen ? ' open' : '')}>
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} className={({ isActive }) => NavButtonStyle(isActive)} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function shrinkWhenScrolled() {
  const scrollThreshold = 50;
  let header = document.getElementById("header")!;

  if (document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold) {
    header.className = "shrunk-header";
  } else {
    header.className = "";
  }
}

export default Header;