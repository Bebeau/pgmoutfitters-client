import { LegalDocument, LegalSection } from '../assets/data/legal';
import PageHelmet from './pageHelmet';

type legalPageType = {
  title: string;
  description: string;
  canonical: string;
  heading: string;
  document: LegalDocument;
};

const LegalSectionBlock = ({ section }: { section: LegalSection }) => (
  <section>
    <h2>{section.heading}</h2>
    {section.blocks.map((block, index) =>
      block.type === 'list' ? (
        <ul key={`${section.heading}-${index}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : (
        <p key={`${section.heading}-${index}`}>{block.text}</p>
      )
    )}
  </section>
);

const LegalPage = ({ title, description, canonical, heading, document }: legalPageType) => (
  <div className="legalPage">
    <PageHelmet title={title} description={description} canonical={canonical} />
    <div className="contentWrap">
      <h1>{heading}</h1>
      <p className="legalUpdated">Last updated: {document.lastUpdated}</p>
      <article>
        <p>{document.intro}</p>
        {document.sections.map((section) => (
          <LegalSectionBlock key={section.heading} section={section} />
        ))}
      </article>
    </div>
  </div>
);

export default LegalPage;
