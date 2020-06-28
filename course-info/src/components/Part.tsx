import React from 'react';
import { CoursePart, CoursePartTwo, CoursePartThree, CoursePartFour, CoursePartDiscription, CoursePartBase } from '../types';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled union member: ${JSON.stringify(value)}`);
};

const GeneralInfo: React.FC<CoursePartBase> = ({ name, exerciseCount }) => (
  <>
    <h3>{name}</h3>
    <p>Number of Exercises: {exerciseCount}</p>
  </>
);

const InfoWithDescription: React.FC<CoursePartDiscription> = (props) => (
  <>
    <GeneralInfo {...props} />
    <p>Description: {props.description}</p>
  </>
);

const PartTwoInfo: React.FC<CoursePartTwo> =(props) => (
  <>
    <GeneralInfo {...props} />
    <p>Number of group projects: {props.groupProjectCount}</p>
  </>
);

const PartThreeInfo: React.FC<CoursePartThree> =(props) => (
  <>
    <InfoWithDescription {...props} />
    <p>Number of group projects: {props.exerciseSubmissionLink}</p>
  </>
);

const PartFourInfo: React.FC<CoursePartFour> =(props) => (
  <>
    <InfoWithDescription {...props} />
    <p>Number of people who liked it: {props.peopleLikedIt}</p>
  </>
);

const Part: React.FC<CoursePart> = (props) => {
  const partInfo = () => {
    switch(props.name) {
      case 'Fundamentals':
        return <InfoWithDescription {...props}/>
      case 'Using props to pass data':
        return <PartTwoInfo {...props} />
      case 'Deeper type usage':
        return <PartThreeInfo {...props} />
      case 'GraphQL':
        return <PartFourInfo {...props} />
      default: 
        return assertNever(props);
    }
  };

  return(
    <div>
      {partInfo()}
    </div>
  )
};

export default Part;