import { api } from './api';

const authors = api.injectEndpoints({
	endpoints: (build) => ({
		getAuthors: build.query({
			query: () => ({
				url: '/authors/all',
			}),
			transformResponse: (response) => response.result,
			providesTags: ['Authors'],
		}),
	}),
});

export const { useGetAuthorsQuery } = authors;
