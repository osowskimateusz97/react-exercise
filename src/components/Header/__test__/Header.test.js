import { screen } from '@testing-library/react';
import { userInfo } from '../../../data/mockedUser';
import { render } from '../../../test-utils';
import Header from '../Header';

describe('Input', () => {
  beforeEach(() => {
    render(<Header />, {
      preloadedState: {
        auth: userInfo,
      },
    });
  });
  it('render header with user name', () => {
    expect(screen.getByText(userInfo.name)).toBeInTheDocument();
  });
  it('render header with logo', () => {
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });
});
