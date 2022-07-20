import PropTypes from 'prop-types';
import css from './Button.module.css';

function BtnLoadMore({onClick}) {
  return (
    <div className={css.btn__wrapper}>
      <button
        className={css.button}
        type="button"
        onClick={onClick}
      >
        Load more
      </button>
    </div>

  )
}

BtnLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default BtnLoadMore;
