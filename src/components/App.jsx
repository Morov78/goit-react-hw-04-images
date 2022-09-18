import { useEffect, useState, useLayoutEffect } from 'react';
import SearchBar from './SearchBar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import API from '../services/api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Error from './Error/Error';
import { Notify } from 'notiflix';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [loadMore, setLoadMore] = useState(false);

  const handleFormSubmit = searchQuery => {
    if (query === searchQuery) {
      Notify.warning('You already have the result with this query');

      return;
    }

    setQuery(searchQuery);
    setPage(1);
    setPictures([]);
    setLoadMore(false);
    setStatus(Status.IDLE);
  };

  const clickLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus(Status.PENDING);
    setLoadMore(false);

    API.fetchPictures(query, page)
      .then(data => {
        if (data.totalHits === 0) {
          Notify.warning('No found images on this query');
          setQuery('');
          setStatus(Status.IDLE);

          return;
        }

        const filterPictures = data.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          })
        );

        const newPictures = pictures.concat(filterPictures);

        if (newPictures.length !== data.totalHits) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
        }

        setStatus(Status.RESOLVED);
        setPictures(newPictures);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  useLayoutEffect(() => {
    if (page <= 1) {
      return;
    }

    const windowHeight = window.innerHeight;
    window.scrollBy(0, 0.815 * windowHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictures]);

  return (
    <div className={css.App}>
      <SearchBar onFormSubmit={handleFormSubmit} />
      {pictures.length !== 0 && <ImageGallery pictures={pictures} />}
      {loadMore && <Button onClick={clickLoadMore}>LoadMore</Button>}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && <Error />}
    </div>
  );
}
