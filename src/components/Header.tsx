import { NavLink, Link } from 'react-router-dom'

import './Header.css'
import { useEffect } from 'react';

function NavButtonStyle(isActive: boolean) {
  return "nav-btn button " + (isActive ? "active" : "");
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
        <Link to="/" className="scaled-logo">
          <h2 style={{ margin: 0 }}>Alfred Roy Manongsong</h2>
        </Link>
        <nav className="nav-btn-group">
          <NavLink className={({ isActive }) => NavButtonStyle(isActive)} to="/portfolio">Portfolio</NavLink>        </nav>
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