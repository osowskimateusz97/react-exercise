import { api } from './api';

const courses = api.injectEndpoints({
	endpoints: (build) => ({
		getCourses: build.query({
			query: () => ({
				url: '/courses/all',
			}),
			transformResponse: (response) => response.result,
			providesTags: ['Courses'],
		}),
	}),
});

export const { useGetCoursesQuery } = courses;
