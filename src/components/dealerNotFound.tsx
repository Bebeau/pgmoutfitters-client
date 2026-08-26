import { Link } from 'react-router-dom';
import PageHelmet from './pageHelmet';

const DealerNotFound = () => {
  return (
    <div className="company contentWrap">
      <PageHelmet noindex />
      <section className="companyCopy">
        <h3>Dealer not found</h3>
        <p>
          This dealer is not in the PGM Outfitters network. Browse the current
          deer feeders or request pricing from the homepage.
        </p>
        <Link to="/" className="btn">
          View deer feeders
        </Link>
      </section>
    </div>
  );
};

export default DealerNotFound;
