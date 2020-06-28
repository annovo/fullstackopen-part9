import React from 'react';
import { courseParts } from '../types';

const Total: React.FC = () => (
  <p>
    <strong>Total number of exercises{" "}</strong>
    {courseParts.reduce((count, part) => count + part.exerciseCount, 0)}
  </p>
);

export default Total;