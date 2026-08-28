import { Link } from 'react-router-dom';

const LegalLinks = () => (
  <nav className="legalLinks" aria-label="Legal">
    <Link to="/terms">Terms of Use</Link>
    <Link to="/privacy">Privacy Policy</Link>
  </nav>
);

export default LegalLinks;
