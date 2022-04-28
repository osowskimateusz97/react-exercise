import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import authSlice from './features/authSlice';
import { api } from './services/api';
import { ProvideAuth } from './hook/useAuth';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { auth: authSlice, [api.reducerPath]: api.reducer },
      preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const history = createMemoryHistory();
    return (
      <MemoryRouter location={history.location} navigator={history}>
        <Provider store={store}>
          <ProvideAuth>{children}</ProvideAuth>
        </Provider>
      </MemoryRouter>
    );
  }
  store.dispatch(api.util.resetApiState());
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };

export const typeToTheInput = (placeholderText, value) => {
  const input = screen.getByPlaceholderText(placeholderText);
  userEvent.type(input, value);
};

export const submitForm = (btnName) => {
  const btnSubmit = screen.getByRole('button', {
    name: btnName,
  });

  userEvent.click(btnSubmit);
};
