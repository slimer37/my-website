import { NavLink } from 'react-router-dom'

import './Header.css'
import { useEffect } from 'react';

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
        <nav className="nav-btn-group">
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