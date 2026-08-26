import { HOME_DESCRIPTION, HOME_HEADING } from '../utils/siteMeta';

const HomeHeading = () => {
  return (
    <div className="homeHeading contentWrap">
      <h1>{HOME_HEADING}</h1>
      <p>{HOME_DESCRIPTION}</p>
    </div>
  );
};

export default HomeHeading;
