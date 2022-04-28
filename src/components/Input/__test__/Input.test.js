import { fireEvent, screen } from '@testing-library/react';
import { render } from '../../../test-utils';
import Input from '../Input';

const labelText = 'Place type name';

describe('Input', () => {
  it('render properly input with props', () => {
    render(
      <Input
        placeholderText='Name'
        labelText={labelText}
        id='name'
        name='name'
      />
    );
    expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(labelText)).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', {
        name: labelText,
      }).value
    ).toBe('');
  });

  it('properly change input value', () => {
    const handleChange = jest.fn();
    render(
      <Input
        placeholderText='Name'
        labelText={labelText}
        id='name'
        name='name'
        onChange={handleChange}
      />
    );
    const inputValue = 'check typing';
    const inputEl = screen.getByLabelText(labelText);
    fireEvent.change(inputEl, {
      target: {
        value: inputValue,
      },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputEl.value).toBe(inputValue);
  });

  it('render different type of input which is passed by props', () => {
    const { container } = render(
      <Input
        placeholderText='Name'
        labelText={labelText}
        id='name'
        name='name'
        tag='textarea'
      />
    );
    const textarea = container.querySelector('textarea');
    expect(textarea).toBeInTheDocument();
  });
});
