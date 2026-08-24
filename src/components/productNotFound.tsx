import { Link } from 'react-router-dom';
import PageHelmet from './pageHelmet';

const ProductNotFound = () => {
  return (
    <div className="company contentWrap">
      <PageHelmet noindex />
      <section className="companyCopy">
        <h3>Deer feeder not found</h3>
        <p>
          This deer feeder is not in the PGM Outfitters lineup. Browse the current
          feeders or request pricing from the homepage.
        </p>
        <Link to="/" className="btn">
          View deer feeders
        </Link>
      </section>
    </div>
  );
};

export default ProductNotFound;
