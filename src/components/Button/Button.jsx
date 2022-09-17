import css from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onClick, children }) {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      {children}
    </button>
  );
}

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};
