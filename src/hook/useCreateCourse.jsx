import { useState } from 'react';
import { shema } from '../schema/createCourse';
import { useCourseList } from '../context/CourseListProvider';
import { filterOutOccupiedAuthors, getOccupiedAuthors } from '../utils/authors';
import { useCreateAuthorMutation } from '../services/authors';

const initialState = {
  title: '',
  description: '',
  duration: 0,
  authors: [],
};

const useCreateCourse = (courseDetails) => {
  const [newCourseDetails, setNewCourseDetails] = useState(
    courseDetails || initialState
  );
  const [newAuthorName, setNewAuthorName] = useState('');
  const { authors, isAuthorsLoading } = useCourseList();
  const [createNewAuthor] = useCreateAuthorMutation();
  const occupiedAuthors =
    authors && getOccupiedAuthors(authors, newCourseDetails.authors);

  const availableAuthors = authors?.filter((author) =>
    filterOutOccupiedAuthors(author, newCourseDetails.authors)
  );

  const isAuthorExist = () =>
    authors.some((author) => author.name === newAuthorName);

  const handleAddNewAuthor = async () => {
    if (!newAuthorName.length || isAuthorExist()) return;
    try {
      await createNewAuthor(newAuthorName).unwrap();
      setNewAuthorName('');
    } catch (err) {
      alert('There was problem with adding new author');
    }
  };

  const showValidMessage = (err) => {
    const msg = [];
    err.inner.forEach((e) => msg.push(e.message));
    alert(msg.join(', \n'));
  };

  const runValidation = async () => {
    try {
      await shema.validate(newCourseDetails, {
        abortEarly: false,
      });
      return true;
    } catch (err) {
      showValidMessage(err);
      return false;
    }
  };

  const save = async (callback) => {
    const isValid = await runValidation();
    if (!isValid) return;
    callback(newCourseDetails);
  };

  const addAuthorToTheCourse = (authorId) => {
    setNewCourseDetails({
      ...newCourseDetails,
      authors: [...newCourseDetails.authors, authorId],
    });
  };

  const removeAuthorToTheCourse = (removingAuthor) => {
    setNewCourseDetails({
      ...newCourseDetails,
      authors: newCourseDetails.authors.filter(
        (occupiedAuthorId) => occupiedAuthorId !== removingAuthor.id
      ),
    });
  };

  return {
    removeAuthorToTheCourse,
    addAuthorToTheCourse,
    isAuthorsLoading,
    save,
    handleAddNewAuthor,
    newCourseDetails,
    setNewCourseDetails,
    newAuthorName,
    setNewAuthorName,
    availableAuthors,
    occupiedAuthors,
  };
};

export default useCreateCourse;
