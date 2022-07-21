import React, { useState } from "react";
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Searchbar(props) {
  const [imageQuery, setImageQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (imageQuery.trim() === '') {
      return toast.error('Input images and photos')
    }
    props.propsQuery(imageQuery);
    setImageQuery('');
  }

  const handleChange = e => {
    setImageQuery(e.currentTarget.value.toLowerCase());
  }

    return (
      <header className={css.searchbar}>
        <form className={css.searchbar__form} onSubmit={handleSubmit}>
            <button type="submit" className={css.searchbar__button}>
              <span className={css.searchbar__label}>Search</span>
            </button>

            <input
              className={css.searchbar__input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={imageQuery}
              onChange={handleChange}
            />
        </form>
      </header>
    )
}

export default Searchbar;
