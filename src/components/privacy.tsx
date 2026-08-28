import { privacyDocument } from '../assets/data/legal';
import { PRIVACY_DESCRIPTION, PRIVACY_TITLE, privacyCanonical } from '../utils/siteMeta';
import LegalPage from './legalPage';

const Privacy = () => (
  <LegalPage
    title={PRIVACY_TITLE}
    description={PRIVACY_DESCRIPTION}
    canonical={privacyCanonical()}
    heading="Privacy Policy"
    document={privacyDocument}
  />
);

export default Privacy;
