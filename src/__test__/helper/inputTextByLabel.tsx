// eslint-disable-next-line import/no-extraneous-dependencies
import { fireEvent, screen } from '@testing-library/dom';

const inputTextByLabel = (selector: string, text: string): void => {
  const inputElement = screen.getByLabelText(selector);
  fireEvent.change(inputElement, { target: { value: text } });
};

export default inputTextByLabel;
