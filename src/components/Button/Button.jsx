import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

Button.prototype = {
  onClick: PropTypes.func.isRequired,
};
