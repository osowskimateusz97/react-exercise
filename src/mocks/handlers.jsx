import { rest } from 'msw';
import { mockedAuthorsList } from '../data/mockedAuthorList';
import { mockedCoursesList } from '../data/mockedCoursesList';

const rootAPI = process.env.REACT_APP_BASE_API;

export const handlers = [
  rest.get(`${rootAPI}/courses/all`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successful: true,
        result: mockedCoursesList,
      })
    );
  }),
  rest.post(`${rootAPI}/login`, (req, res, ctx) => {
    const { name, email } = req.body;
    return res(
      ctx.status(201),
      ctx.json({
        result:
          'Bearer gpLqGE1LSyBVWT4BiILy9JwGIwG8PNEnWl2fdBQfUHPYuWjln9OP8fezRNmrZ2UoGC8f8Ktm54RHvr8YV8e+k27LCuExrnFfWJNeOCU6u1xenCnTqCE2BR/YRqg4FeQJ93iNDRnk9nD0+TW5RxpK5nSRBYUm1mnzUqg9JBznLdO1L+FLkRcTFfMTRlHVf1Pe0vFf+/IG3u1w3767zm1ew1+3iuOea8wGpFIWqQrdUy9NPBqE6sJtjc0duHgvTzc7Szz3Ve6PbwNZrxx4ugJITo89mNKkKXkPxiFvoCuh+NG+rg+F6NUOBXMlzX7jVfuvDba0RfhidSWfOwxwjMLMiA==',
        successful: true,
        user: { email, name },
      })
    );
  }),
  rest.get(`${rootAPI}/users/me`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        result: {
          email: 'admin@email.com',
          id: '85aa767d-73c0-4e23-9a02-27902d418b37',
          name: null,
          password: 'admin123',
          role: 'admin',
        },
        successful: true,
      })
    );
  }),
  rest.post(`${rootAPI}/register`, (_, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        result: 'User was created.',
        successful: true,
      })
    );
  }),
  rest.get(`${rootAPI}/authors/all`, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        successful: true,
        result: mockedAuthorsList,
      })
    );
  }),
  rest.delete(`${rootAPI}/logout`, (_, res, ctx) => {
    return res(ctx.status(200));
  }),
];
