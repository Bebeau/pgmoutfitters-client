import React from 'react';

import moose from '../assets/img/moose.png';
import { IMAGE_SIZES } from '../utils/responsiveImage';
import ResponsiveImage from './responsiveImage';

const Company = () => {
  return (
    <div className="company contentWrap">
      <section className="companyCopy">
        <h2 className="sectionHeading">PGM Outfitters</h2>
        <p>
          PGM Outfitters is a subsidiary of Precision Gear & Machine, LLC. The company has specialized in precise rebuilds and new manufactured equipment to the highest quality standards since 1991. Taking this manufacturing mentality and combining it with a passion for hunting and game management, PGM Outfitters has engineered a line of, truly, next generation deer feeders.
        </p>
      </section>
      <section className="companyImage">
        <ResponsiveImage
          src={moose}
          alt="Michael Lex"
          sizes={IMAGE_SIZES.company}
          lazy
        />
      </section>
    </div>
  )
}

export default Company;
