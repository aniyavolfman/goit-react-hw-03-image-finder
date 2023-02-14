import css from './Modal.module.css';

function handleBackdrop (event ) {
  console.log(event.target, event.currentTarget);
  // if (event.target === event.currentTarget)
};

export function Modal({ largeImg }) {
  const classNamesDiv = [css.overlay, css.isHidden];
  const classNamesImg = [css.modal, css.isHidden];
  if (largeImg) {
    classNamesDiv.pop();
    classNamesImg.pop();
    }
    
  return (
    <div className={classNamesDiv} onClick={handleBackdrop}>
      <div className={classNamesImg}>
        <img src={largeImg} alt="" />
      </div>
    </div>
  );
}
