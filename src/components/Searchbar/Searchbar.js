import { Component } from "react";
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Searchbar extends Component {
  state = {
    query: '',
  }

  handleSubmit = e => {
    e.preventDefault();
    const {query} = this.state;
    if (query.trim() === '') {
      return toast.error('Input images and photos')
    }
    this.props.propsQuery(query);
    this.setState({query: ''})
  }

  handleChange = e => {
    this.setState({
      query: e.currentTarget.value.toLowerCase()
    })
  }

  render() {
    const {query} = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchbar__form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.searchbar__button}>
              <span className={css.searchbar__label}>Search</span>
            </button>

            <input
              className={css.searchbar__input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={this.handleChange}
            />
        </form>
      </header>
    )
  }
}

export default Searchbar;
