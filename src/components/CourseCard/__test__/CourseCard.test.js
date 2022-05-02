import { screen } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { render } from '../../../test-utils';
import { mockedCoursesList } from '../../../data/mockedCoursesList';
import { convertTime } from '../../../utils/convertTime';

const { title, description, creationDate, duration } = mockedCoursesList[0];

describe('CourseCard', () => {
  beforeEach(() => {
    render(<CourseCard {...mockedCoursesList[0]} />);
  });

  it('display title which is passed via props', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('display description which is passed via props', () => {
    expect(
      screen.getByText(new RegExp(description), {
        collapseWhitespace: false,
      })
    ).toBeInTheDocument();
  });

  it('display creationDate which is passed via props', () => {
    expect(screen.getByText(creationDate)).toBeInTheDocument();
  });

  it('display duration which is passed via props', () => {
    expect(screen.getByText(convertTime(duration))).toBeInTheDocument();
  });
});
