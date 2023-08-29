import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';


interface Prop {
  id?: any
  modalOpen?: any,
  setModalOpen?: any,
  buttonType?: string
  children?: any
  variant?: string
  onClick? : React.MouseEventHandler,
  value? : string,
  onChange? : any,
}
type buttonTypes = {
  [key: string]: any;

};

const obj: buttonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};
function Button({ buttonType, variant = 'primary', ...rest }: Prop) {
  return (
    <button
      type={buttonType === 'submit' ? 'submit' : 'button'}
      className={getClasses([
        styles.button,
        styles[`button--${obj[variant]}`],
      ])}
      {...rest}
    >
    
    </button>
  );
}



function SelectButton({ children, id, ...rest }: Prop) {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton };
export default Button;
