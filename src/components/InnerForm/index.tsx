import './InnerForm.scss';
import React, {
  ChangeEvent, SyntheticEvent, useEffect, createRef,
} from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../core/hooks';
import { RootState } from '../../core/store';
import { getGifsData } from '../../slices/gallery';
import { showNotification } from '../../slices/notification';
import { setValue } from '../../slices/innerForm';

export default function InnerForm() {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.innerForm);
  const inputRef = createRef<HTMLInputElement>();
  const loadState = useSelector((state: RootState) => state.gallery.load);

  const { value: formValue } = formData;

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus();
    }
  });

  const inputChangeHandler = (evt: ChangeEvent) => {
    const inputValue = (evt.target as HTMLInputElement).value;

    const sanitazedValue = inputValue
      .replace(/[^a-z,]/iu, '');

    dispatch(setValue(sanitazedValue));
  };

  const submitHandler = async (evt: SyntheticEvent) => {
    evt.preventDefault();

    const formElement = evt.target as typeof evt.target & {
      tag: { value: string };
    };

    const tagInputValue = formElement
      .tag
      .value
      .toLowerCase();

    if (tagInputValue === '') {
      dispatch(showNotification({ source: 'innerForm', text: "Заполните поле 'тег'" }));
      return;
    }

    dispatch(getGifsData(tagInputValue));
  };

  return (
    <Form className="inner-form app__inner-form" onSubmit={submitHandler}>
      <Form.Control
        className="form-control"
        name="tag"
        placeholder="Введите тег"
        onChange={inputChangeHandler}
        value={formValue}
        ref={inputRef}
      />
      <Button
        variant={loadState === 'process' ? 'warning' : 'success'}
        type="submit"
        disabled={loadState === 'process'}
      >
        {loadState === 'process' ? 'Загрузка...' : 'Загрузить'}
      </Button>
    </Form>
  );
}
