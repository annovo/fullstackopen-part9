export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDiscription extends CoursePartBase {
  description: string;
}

export interface CoursePartOne extends CoursePartDiscription {
  name: "Fundamentals";
}

export interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartDiscription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFour extends CoursePartDiscription {
  name: 'GraphQL';
  peopleLikedIt: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree |CoursePartFour;

// this is the new coursePart variable
export const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: 'GraphQL',
    exerciseCount: 22,
    description: 'Something happend in there',
    peopleLikedIt: 1
  }
];