import React from 'react';
import useCreateCourse from '../../hook/useCreateCourse';
import * as constant from '../../utils/constants';
import { convertTime } from '../../utils/convertTime';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Loader from '../Loader/Loader';
import AuthorInfo from './AuthorInfo';
import styles from './CourseForm.module.scss';

const CourseForm = ({ courseDetails, saveBtnTitle, handleSave }) => {
  const {
    isAuthorsLoading,
    addAuthorToTheCourse,
    removeAuthorToTheCourse,
    handleAddNewAuthor,
    newCourseDetails,
    setNewCourseDetails,
    newAuthorName,
    setNewAuthorName,
    availableAuthors,
    occupiedAuthors,
    save,
  } = useCreateCourse(courseDetails);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const parsedValue = name === 'duration' ? parseInt(value) : value;
    setNewCourseDetails({ ...newCourseDetails, [name]: parsedValue });
  };

  const handleSaveNewCourse = () => save(handleSave);

  return (
    <section className={styles.wrapper}>
      <div className={styles.wrapper__title}>
        <Input
          onChange={handleChange}
          value={newCourseDetails.title}
          placeholderText={constant.bTitle}
          name={constant.title}
          id={constant.title}
          labelText={constant.bTitle}
        />
        <Button buttonText={saveBtnTitle} onClick={handleSaveNewCourse} />
      </div>
      <Input
        placeholderText={constant.bEnterDescription}
        id={constant.description}
        name={constant.description}
        labelText={constant.bDescription}
        tag='textarea'
        classContainer={styles.description}
        onChange={handleChange}
        value={newCourseDetails.description}
      />
      <div className={styles.detailsContainer}>
        <div className='left-side'>
          <div className={styles.authorContainer}>
            <h1>Add author</h1>
            <Input
              placeholderText={constant.bEnterAuthorName}
              id={constant.authorName}
              labelText={constant.bAuthorName}
              name={constant.authorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
              value={newAuthorName}
            />
            <Button
              buttonText={constant.bCreateAuthor}
              variant={constant.purple}
              onClick={handleAddNewAuthor}
            />
          </div>
          <div>
            <h1>Duration</h1>
            <Input
              placeholderText={constant.bDurationInMinutes}
              id={constant.duration}
              name={constant.duration}
              labelText={constant.bDuration}
              onChange={handleChange}
              value={newCourseDetails.duration}
            />
          </div>
        </div>
        <div className='right-side'>
          <div>
            <h1>Authors</h1>
            {isAuthorsLoading ? (
              <Loader />
            ) : (
              availableAuthors.map((author) => (
                <AuthorInfo
                  key={author.id}
                  name={author.name}
                  btnText={constant.bAddAuthor}
                  onClick={() => addAuthorToTheCourse(author.id)}
                />
              ))
            )}
          </div>
          <div>
            <h1>Course authors</h1>
            {occupiedAuthors.length ? (
              occupiedAuthors.map((author) => (
                <AuthorInfo
                  key={author.id}
                  name={author.name}
                  btnText={constant.bRemoveAuthor}
                  btnVariant={constant.purple}
                  onClick={() => removeAuthorToTheCourse(author)}
                />
              ))
            ) : (
              <p>Author list is empty</p>
            )}
          </div>
        </div>
      </div>
      <div className='total'>
        Duration: <b>{convertTime(newCourseDetails.duration)}</b> hours
      </div>
    </section>
  );
};

export default CourseForm;
