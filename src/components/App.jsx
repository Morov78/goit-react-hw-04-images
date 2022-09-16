import { Component } from 'react';
import SearchBar from './SearchBar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import API from '../services/api';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import { Notify } from 'notiflix';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchQuery: null,
    page: 1,
    pictures: [],
    loadMore: false,
    status: Status.IDLE,
    error: null,
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      Notify.warning('You already have the result with this query');
      return;
    }

    this.setState({ searchQuery, page: 1, pictures: [] });
  };

  clickLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevsearchQuery = prevState.searchQuery;
    const nextsearchQuery = this.state.searchQuery;

    if (prevPage === nextPage && prevsearchQuery === nextsearchQuery) {
      return;
    }

    this.setState({ status: Status.PENDING, loadMore: false, error: null });

    try {
      const data = await API.fetchPictures(
        this.state.searchQuery,
        this.state.page
      );

      if (data.totalHits === 0) {
        Notify.warning('No found images on this query');
        this.setState({ status: Status.IDLE });
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

      const newPictures = this.state.pictures.concat(filterPictures);
      let isLoadMore = true;

      if (newPictures.length === data.totalHits) {
        isLoadMore = false;
      }

      this.setState({
        pictures: newPictures,
        status: Status.RESOLVED,
        loadMore: isLoadMore,
      });
    } catch (error) {
      this.setState({ error, status: Status.REJECTED });
    }
  }

  render() {
    const { status, pictures, loadMore } = this.state;

    return (
      <div className={css.App}>
        <SearchBar onSubmit={this.handleFormSubmit} />
        {pictures.length !== 0 && <ImageGallery pictures={pictures} />}
        {loadMore && <Button onClick={this.clickLoadMore}>LoadMore</Button>}
        {status === Status.PENDING && <Loader />}
      </div>
    );
  }
}
