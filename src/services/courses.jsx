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
		createCourse: build.mutation({
			query: (payload) => ({
				url: `/courses/add`,
				method: 'POST',
				body: payload,
			}),
			invalidatesTags: ['Courses'],
		}),
		deleteCourse: build.mutation({
			query: (id) => ({
				url: `/courses/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Courses'],
		}),

		updateCourse: build.mutation({
			query: ({ id, payload }) => {
				console.log(id, payload);
				return {
					url: `/courses/${id}`,
					method: 'PUT',
					body: payload,
				};
			},
			invalidatesTags: ['Courses'],
		}),
	}),
});

export const {
	useGetCoursesQuery,
	useCreateCourseMutation,
	useDeleteCourseMutation,
	useUpdateCourseMutation,
} = courses;
