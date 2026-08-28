import { termsDocument } from '../assets/data/legal';
import { TERMS_DESCRIPTION, TERMS_TITLE, termsCanonical } from '../utils/siteMeta';
import LegalPage from './legalPage';

const Terms = () => (
  <LegalPage
    title={TERMS_TITLE}
    description={TERMS_DESCRIPTION}
    canonical={termsCanonical()}
    heading="Terms of Use"
    document={termsDocument}
  />
);

export default Terms;
