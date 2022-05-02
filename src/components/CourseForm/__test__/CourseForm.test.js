import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import CourseListProvider from '../../../context/CourseListProvider';
import { userInfo } from '../../../data/mockedUser';
import { render, submitForm as submitCourse } from '../../../test-utils';
import CourseForm from '../CourseForm';
import * as constants from '../../../utils/constants';
import {
  mockedAuthorsList,
  mockedOccupiedAuthorsList,
  mockedAvailableAuthorsList,
} from '../../../data/mockedAuthorList';
import { mockedCoursesList } from '../../../data/mockedCoursesList';

const renderCourseList = (props = {}) => {
  const { courseDetails, handleSave, saveBtnTitle } = props;
  cleanup();
  render(
    <CourseListProvider>
      <CourseForm
        courseDetails={courseDetails}
        handleSave={handleSave}
        saveBtnTitle={saveBtnTitle}
      />
    </CourseListProvider>,
    {
      preloadedState: {
        auth: userInfo,
      },
    }
  );
  expect(screen.getByTestId('availableAuthorsLoader')).toBeInTheDocument();
};

const getInputByPlaceholder = (placeholder) =>
  screen.getByPlaceholderText(placeholder);

describe('CourseForm', () => {
  describe('Initial rendering', () => {
    it('Initialy show message "occupied authors list is empty"', () => {
      renderCourseList();
      expect(screen.getByLabelText(constants.bTitle)).toBeInTheDocument();
      expect(screen.getByText(/author list is empty/i)).toBeInTheDocument();
    });
  });
  describe('Full rendering', () => {
    beforeEach(async () => {
      renderCourseList();
      await screen.findByText(mockedAuthorsList[0].name);
    });

    it('Render component without passing props', () => {
      expect(getInputByPlaceholder(constants.bTitle)).toBeInTheDocument();
      expect(
        getInputByPlaceholder(constants.bEnterDescription)
      ).toBeInTheDocument();
      expect(
        getInputByPlaceholder(constants.bEnterAuthorName)
      ).toBeInTheDocument();
      expect(screen.getByText(constants.bCreateAuthor)).toBeInTheDocument();
      expect(
        getInputByPlaceholder(constants.bDurationInMinutes)
      ).toBeInTheDocument();
    });

    it('Render authors', () => {
      expect(screen.getByLabelText(constants.bTitle)).toBeInTheDocument();
      mockedAuthorsList.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    it('Render proper length of available authors', () => {
      expect(screen.getAllByTestId('availableAuthorCard').length).toBe(
        mockedAuthorsList.length
      );
    });

    it('Add author to the occupied list', () => {
      expect(screen.getAllByTestId('availableAuthorCard').length).toBe(
        mockedAuthorsList.length
      );
    });

    it('Initially occupied authors list is empty', () => {
      expect(screen.queryAllByTestId('occupiedAuthorCard').length).toBe(0);
    });

    it('Properly passed values for editing course', async () => {
      renderCourseList({ courseDetails: mockedCoursesList[0] });
      const title = screen.getByPlaceholderText(constants.bTitle);
      const description = screen.getByPlaceholderText(
        constants.bEnterDescription
      );
      expect(title.value).toBe(mockedCoursesList[0].title);
      expect(description.value).toBe(mockedCoursesList[0].description);
    });

    it('Properly group occupied and available authors in edit course form', async () => {
      renderCourseList({ courseDetails: mockedCoursesList[0] });

      const occupiedAuthors = await screen.findAllByTestId(
        'occupiedAuthorCard-authorName'
      );
      const availableAuthors = await screen.findAllByTestId(
        'availableAuthorCard-authorName'
      );
      const availableAuthorsNames = getAuthorsName(mockedAvailableAuthorsList);
      const occupiedAuthorsNames = getAuthorsName(mockedOccupiedAuthorsList);

      availableAuthors.forEach((availableAuthor) => {
        expect(availableAuthorsNames).toContain(availableAuthor.textContent);
      });

      occupiedAuthors.forEach((occupiedAuthor) => {
        expect(occupiedAuthorsNames).toContain(occupiedAuthor.textContent);
      });
    });

    it('Add author to the course', async () => {
      const { name } = await addAuthorToTheCourse();
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    it('Run validation after save empty fields', async () => {
      const addNewCourse = jest.fn();
      window.alert = jest.fn();
      renderCourseList({
        handleSave: addNewCourse,
        saveBtnTitle: constants.bCreateCourse,
      });
      const input = getInputByPlaceholder(constants.bEnterDescription);
      fireEvent.change(input, {
        target: {
          value: 'React',
        },
      });
      submitCourse(constants.bCreateCourse);
      expect(addNewCourse).toHaveBeenCalledTimes(0);
      await waitFor(() => expect(window.alert).toHaveBeenCalledTimes(1));
      const alertInfo =
        'title is a required field, \nauthors field must have at least 1 items';
      expect(window.alert.mock.calls[0][0]).toMatch(alertInfo);
    });

    it('Add new course', async () => {
      const addNewCourse = jest.fn();
      renderCourseList({
        handleSave: addNewCourse,
        saveBtnTitle: constants.bCreateCourse,
      });
      formInfo.forEach(({ placeholderName, value }) => {
        const input = getInputByPlaceholder(placeholderName);
        fireEvent.change(input, {
          target: {
            value,
          },
        });
      });
      const { id } = await addAuthorToTheCourse();
      await screen.findByTestId('occupiedAuthorCard');
      submitCourse(constants.bCreateCourse);
      await waitFor(() => expect(addNewCourse).toHaveBeenCalledTimes(1));

      expect(addNewCourse.mock.calls[0][0]).toEqual({
        title: 'React',
        description: 'React is the most popular library',
        duration: 120,
        authors: [id],
      });
    });
  });
});

const getAuthorsName = (arr) => arr.map((author) => author.name);

const addAuthorToTheCourse = async () => {
  const { name, id } = mockedAuthorsList[0];
  const addAuthorBtn = await screen.findByTestId(
    `availableAuthorCard-${name}-btn`
  );
  fireEvent.click(addAuthorBtn);
  return { name, id };
};

const formInfo = [
  {
    placeholderName: constants.bEnterDescription,
    value: 'React is the most popular library',
  },
  {
    placeholderName: constants.bTitle,
    value: 'React',
  },
  {
    placeholderName: constants.bDurationInMinutes,
    value: '120',
  },
];
