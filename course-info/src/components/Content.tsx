import React from 'react';
import { courseParts } from '../types';
import Part from './Part';

const Content: React.FC = () => (
  <>
    {courseParts.map((part, index) => 
      <Part key = {index} {...part} />
    )}
  </>
)

export default Content;