import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { server } from './mocks/server';
import { rest } from 'msw';
import { render, submitForm, typeToTheInput } from './test-utils';
import * as constants from './utils/constants';

const rootAPI = process.env.REACT_APP_BASE_API;

const {
  NAME_PLACEHOLDER,
  EMAIL_PLACEHOLDER,
  PASSWORD_PLACEHOLDER,
  bLogin,
  bRegistartion,
} = constants;

describe('App View', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('Show registration view initialy', () => {
    expect(
      screen.getByRole('heading', { name: bRegistartion })
    ).toBeInTheDocument();
  });

  it('Login correctly and go to the course view', async () => {
    userEvent.click(
      await screen.findByRole('link', {
        name: /login/i,
      })
    );
    typeToTheInput(EMAIL_PLACEHOLDER, 'user@email.com');
    typeToTheInput(PASSWORD_PLACEHOLDER, 'admin123');
    submitForm(bLogin);
    expect(
      await screen.findByRole('button', { name: /add new course/i })
    ).toBeInTheDocument();
  });

  it('Go to the login view after successful registration', async () => {
    typeToTheInput(NAME_PLACEHOLDER, 'user');
    typeToTheInput(EMAIL_PLACEHOLDER, 'user@email.com');
    typeToTheInput(PASSWORD_PLACEHOLDER, 'password123');
    submitForm(bRegistartion);
    expect(
      await screen.findByRole('heading', { name: bLogin })
    ).toBeInTheDocument();
  });
  it('View does not change when register throw an error', async () => {
    const errorMsg = 'There is an issue with connection!';
    server.use(
      rest.post(`${rootAPI}/register`, (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [errorMsg], successful: false })
        );
      })
    );
    submitForm(bRegistartion);
    expect(
      await screen.findByRole('heading', { name: bRegistartion })
    ).toBeInTheDocument();
  });
});
