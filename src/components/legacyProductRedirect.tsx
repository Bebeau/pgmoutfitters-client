import { Navigate, useParams } from 'react-router-dom';
import { productPath } from '../utils/productPath';

const LegacyProductRedirect = () => {
  const { slug } = useParams();
  return <Navigate to={productPath(slug)} replace />;
};

export default LegacyProductRedirect;
