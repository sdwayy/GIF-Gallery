import './InnerForm.scss';
import React, {
  ChangeEvent, SyntheticEvent, useEffect, createRef,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addImage } from '../../slices/gallery';
import { showNotification } from '../../slices/notification';
import { changeStatus, setValue } from '../../slices/innerForm';
import { ImageType } from '../../types';

const KEY_WORD_FOR_AUTOUPDATE = 'delay';
const AUTOUPDATE_DELAY_MS = 5000;
const API_KEY = '1fvGjMHdW85x3VmAklanxUniZW7thdEy';

const getGifDataFromApi = async (gifTag: string, apiKey: string) => {
  const getUrl = (tag: string) => `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${tag}`;

  const gifData = await fetch(getUrl(gifTag))
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Произошла HTTP ошибка: ${error.message}`);
    });

  return { tag: gifTag, gifData };
};

const InnerForm = ({ additionalClasses } : { additionalClasses: string }) => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.innerForm);
  const inputRef = createRef<HTMLInputElement>();

  const { value: formValue, status: formStatus } = formData;

  useEffect(() => {
    const input = inputRef.current;

    if (input) {
      input.focus();
    }
  });

  const getGifsData = async (tags: Array<string>) => {
    const promises = tags.map((tag) => getGifDataFromApi(tag, API_KEY));
    const associatedId = Date.now();
    const result: Array<ImageType> = [];
    const gifsData: any = await Promise.all(promises);

    gifsData.forEach((
      { tag, gifData: { data } } : { tag: string, gifData: any },
    ) => {
      if (data.length === 0) {
        dispatch(showNotification(`По тегу ${tag} ничего не найдено`));
      } else {
        result.push({ tag, associatedId, url: data.image_url });
      }
    });

    return result;
  };

  const updateGallery = async (gifTag: string) => {
    const tags = gifTag.split(',');

    try {
      const gifsData = await getGifsData(tags);
      gifsData.forEach((gifData) => dispatch(addImage(gifData)));
    } catch (error) {
      dispatch(showNotification(error.message));
    }
  };

  const autoUpdate = () => setTimeout(() => {
    updateGallery('random')
      .then(() => {
        autoUpdate();
      })
      .catch((error) => dispatch(showNotification(`Autoupdate failed: ${error}`)));
  }, AUTOUPDATE_DELAY_MS);

  const changeHandler = (evt: ChangeEvent) => {
    const inputValue = (evt.target as HTMLInputElement).value;
    const validatedValue = inputValue
      .replace(/[^a-z,]/iu, '');

    dispatch(setValue(validatedValue));
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
      dispatch(showNotification("Заполните поле 'тег'"));
      return;
    }

    dispatch(changeStatus('process'));

    if (tagInputValue === KEY_WORD_FOR_AUTOUPDATE) {
      autoUpdate();
    } else {
      updateGallery(tagInputValue)
        .then(() => {
          dispatch(changeStatus('fulfilled'));
        })
        .catch((error) => dispatch(showNotification(error)));
    }
  };

  return (
    <Form className={`inner-form ${additionalClasses}`} onSubmit={submitHandler}>
      <Form.Control
        className="form-control"
        name="tag"
        placeholder="Введите тег"
        onChange={changeHandler}
        value={formValue}
        ref={inputRef}
      />
      <Button
        variant={formStatus === 'process' ? 'warning' : 'success'}
        type="submit"
        disabled={formStatus === 'process'}
      >
        {formStatus === 'process' ? 'Загрузка...' : 'Загрузить'}
      </Button>
    </Form>
  );
};

export default InnerForm;
