import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header header = {courseName} />
      <Content />
      <Total />
    </div>
  );
};

export default App;
