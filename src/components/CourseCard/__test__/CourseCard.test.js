import { screen } from '@testing-library/react';
import CourseCard from '../CourseCard';
import { render } from '../../../test-utils';
import { mockedCoursesList } from '../../../data/mockedCoursesList';
import { convertTime } from '../../../utils/convertTime';

describe('CourseCard', () => {
  it('render course card properly with props', () => {
    render(<CourseCard {...mockedCoursesList[0]} />);
    const { title, description, creationDate, duration } = mockedCoursesList[0];
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(description), {
        collapseWhitespace: false,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(creationDate)).toBeInTheDocument();
    expect(screen.getByText(convertTime(duration))).toBeInTheDocument();
  });
});
