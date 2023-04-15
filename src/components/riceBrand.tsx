import React from 'react';

import riceBrand from '../assets/img/ricebrand.png';

const RiceBrand = () => {
  return (
    <div className="block riceBrand">
      <article>
        <img src={riceBrand} alt='Rice Brand' />
      </article>
      <article>
        <div>
          <h3>Rice Brand Feed</h3>
          <p>Rice bran is a popular choice as deer feed due to its high nutrient content and digestibility. It contains a high level of fat, which is essential for providing the deer with energy during the winter months. Rice bran is a good source of protein, fiber, and minerals, which are crucial for the deer’s overall health and growth. Unlike other types of feed, rice bran does not contain any harmful additives, making it a safe and natural option for deer.</p>
        </div>
      </article>
    </div>
  )
}

export default RiceBrand;
