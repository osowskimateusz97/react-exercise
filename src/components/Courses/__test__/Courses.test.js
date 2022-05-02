import {
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { rest } from 'msw';
import CourseListProvider from '../../../context/CourseListProvider';
import { mockedCoursesList } from '../../../data/mockedCoursesList';
import { userInfo } from '../../../data/mockedUser';
import { server } from '../../../mocks/server';
import { render } from '../../../test-utils';
import Courses from '../Courses';

const rootAPI = process.env.REACT_APP_BASE_API;

describe('CourseCard', () => {
  beforeEach(() => {
    render(
      <CourseListProvider>
        <Courses />
      </CourseListProvider>,
      {
        preloadedState: {
          auth: userInfo,
        },
      }
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Render courses correctly', () => {
    mockedCoursesList.forEach(async ({ title, description }) => {
      expect(await screen.findByText(title)).toBeInTheDocument();
      expect(await screen.findByText(description)).toBeInTheDocument();
    });
  });

  it('Show loader initially', () => {
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Hide "add new course" button when user is logged in', async () => {
    await waitForElementToBeRemoved(screen.queryByTestId('loader'));

    expect(
      screen.queryByRole('button', {
        name: /add new course/i,
      })
    ).toBeNull();
  });

  it('Show "add new course" button when admin is logged in', async () => {
    cleanup();
    render(
      <CourseListProvider>
        <Courses />
      </CourseListProvider>,
      {
        preloadedState: {
          auth: { ...userInfo, role: 'admin' },
        },
      }
    );
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByTestId('loader'));

    expect(
      screen.getByRole('button', {
        name: /add new course/i,
      })
    );
  });

  it('Course list does not exist when course array is empty', async () => {
    server.use(
      rest.get(`${rootAPI}/courses/all`, (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            successful: true,
            result: [],
          })
        );
      })
    );
    await waitForElementToBeRemoved(screen.queryByTestId('loader'));
    expect(screen.queryByTestId('courseCard')).not.toBeInTheDocument();
  });
});
