import { Component } from 'react';
import css from './Searchbar.module.css';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    const value = event.currentTarget.value;
    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const value = this.state.value.trim();
    this.setState({ value: '' });

    if (value === '') {
      return;
    }

    this.props.onSubmit(value);
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['SearchForm-button']}></button>
          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          ></input>
        </form>
      </header>
    );
  }
}
