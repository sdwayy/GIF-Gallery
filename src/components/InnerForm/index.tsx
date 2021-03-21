import './InnerForm.scss';
import React, {
  ChangeEvent, SyntheticEvent, useEffect, createRef,
} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { addImage } from '../../slices/gallery';
import { showNotification } from '../../slices/notification';
import { changeStatus, setValue } from '../../slices/innerForm';

const KEY_WORD_FOR_AUTOUPDATE: string = 'delay';
const AUTOUPDATE_DELAY_MS = 5000;

const getGifDataFromApi = async (gifTag: string) => {
  const API_KEY: string = '1fvGjMHdW85x3VmAklanxUniZW7thdEy';
  const getUrl = (tag: string) => `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&tag=${tag}`;

  const gifData = await fetch(getUrl(gifTag))
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(`Произошла HTTP ошибка: ${error.message}`);
    });

  if (gifData.data.length === 0) {
    throw new Error(`По тегу ${gifTag} ничего не найдено`);
  }

  return { tag: gifTag, gifData };
};

const getGifsData = async (tags: Array<string>) => {
  const promises = tags.map((tag) => getGifDataFromApi(tag));
  const associatedId = Date.now();

  const gifsData: any = await Promise.all(promises)
    .then((value) => value);

  const result = gifsData.map(({ gifData: { data }, tag }: any) => ({
    tag,
    url: data.image_url,
    associatedId,
  }));

  return result;
};

const InnerForm: React.FC<{ additionalClasses: string }> = (
  { additionalClasses } : { additionalClasses: string },
) => {
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

  const updateGallery = async (gifTag: string) => {
    const tags = gifTag.split(',');

    try {
      const imagesData = await getGifsData(tags);

      imagesData.forEach((
        imageData: { url: string, tag: string, associatedImageId: number },
      ) => dispatch(addImage(imageData)));
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

    const tagInputValue = formElement.tag.value;

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
