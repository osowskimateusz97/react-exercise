import { screen, waitFor } from '@testing-library/react';
import { server } from '../../mocks/server';
import { rest } from 'msw';
import { render, submitForm, typeToTheInput } from '../../test-utils';
import * as constants from '../../utils/constants';
import LoginView from '../LoginView';

const rootAPI = process.env.REACT_APP_BASE_API;

const { EMAIL_PLACEHOLDER, PASSWORD_PLACEHOLDER, bLogin } = constants;

describe('Login View', () => {
  beforeEach(() => {
    render(<LoginView />);
  });

  it('Render heading with proper name', () => {
    expect(screen.getByRole('heading', { name: bLogin })).toBeInTheDocument();
  });

  it('Login correctly and go to the course view', async () => {
    typeToTheInput(EMAIL_PLACEHOLDER, 'user@email.com');
    typeToTheInput(PASSWORD_PLACEHOLDER, 'admin123');
    submitForm(bLogin);
    await waitFor(() =>
      expect(screen.queryByTestId('errorMsg')).not.toBeInTheDocument()
    );
  });

  it('View does not change when register throw an error', async () => {
    const errorMsg = 'There is an issue with connection!';
    server.use(
      rest.post(`${rootAPI}/login`, (_, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({ errors: [errorMsg], successful: false })
        );
      })
    );
    submitForm(bLogin);
    await waitFor(() => screen.getByText(errorMsg));
    expect(
      await screen.findByRole('heading', { name: bLogin })
    ).toBeInTheDocument();
  });
});
