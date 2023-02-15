import css from './Modal.module.css';

export function Modal({ largeImg, onClose, alt }) {
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <img src={largeImg} alt={alt} />
      </div>
    </div>
  );
}
