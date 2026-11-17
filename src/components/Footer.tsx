import './Footer.css'

import face from "../assets/images/easter-face.png"
import { siteInfo } from '../data/siteInfo'

function Footer() {
  const { author, contacts, hosting } = siteInfo

  return (
    <footer id="footer">
      <div className="footer-column">
        <div className="footer-item">
          <span>Site by {author}</span>
          <img src={face} className="footer-face" />
        </div>
        <address className="footer-item">
          <b>Contact</b>
          <dl className="contact-list">
            {contacts.map(({ label, email }) => (
              <div key={email} className="contact-row">
                <dt>{label}:</dt>
                <dd><a className="footer-link" href={"mailto:" + email}>{email}</a></dd>
              </div>
            ))}
          </dl>
        </address>
      </div>
      <div className="footer-column">
        <p className="footer-item">
          Hosted with&nbsp;
          <a className="footer-link" href={hosting.repoUrl}>{hosting.provider}</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer;
