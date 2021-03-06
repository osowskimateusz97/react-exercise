import React, { useState } from 'react';
import CourseCard from '../CourseCard/CourseCard';
import styles from './Courses.module.scss';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import { useCourseList } from '../../context/CourseListProvider';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { connectionErr } from '../../utils/constants';
import { useAuth } from '../../hook/useAuth';

const Courses = () => {
  const {
    courses,
    isCoursesLoading,
    isAuthorsLoading,
    isCoursesError,
    isAuthorsError,
    findAuthorById,
  } = useCourseList();
  const { isAdmin } = useAuth();
  const [filteredValue, setFilteredValue] = useState('');

  const setFilterValue = (searchValue) => {
    setFilteredValue(searchValue);
  };
  const filterCourses = (course) => {
    const lowercaseInputValue = filteredValue.toLowerCase();
    if (
      course.title.toLowerCase().includes(lowercaseInputValue) ||
      course.id.toLowerCase().includes(lowercaseInputValue)
    )
      return true;
  };

  return (
    <div>
      <div className={styles.searchWrapper}>
        <SearchBar setFilterValue={setFilterValue} />
        {isAdmin ? (
          <Link to='/courses/add'>
            <Button buttonText='Add new course' to='/courses/add' />
          </Link>
        ) : null}
      </div>
      {isAuthorsLoading || isCoursesLoading ? (
        <Loader />
      ) : isCoursesError || isAuthorsError ? (
        <ErrorMsg>{connectionErr}</ErrorMsg>
      ) : courses ? (
        courses
          .filter(filterCourses)
          .map(
            ({ id, title, description, creationDate, duration, authors }) => (
              <CourseCard
                title={title}
                description={description}
                creationDate={creationDate}
                duration={duration}
                authors={findAuthorById(authors)}
                id={id}
                key={id}
              />
            )
          )
      ) : null}
    </div>
  );
};

export default Courses;
