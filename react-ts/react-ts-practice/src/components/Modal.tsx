import {
    type ComponentPropsWithoutRef,
    useRef,
    useImperativeHandle,
    forwardRef,
  } from 'react';
import { createPortal } from 'react-dom';
  
  //Exposed open function
  export type ModalHandle = {
    open: () => void;
  };
  
  type ModalProps = ComponentPropsWithoutRef<'dialog'> & {
    onClose: (value: unknown) => void;
  };
  
  const Modal = forwardRef<ModalHandle, ModalProps>(function Form(
    {children, onClose},
    ref
  ) {
    // Get dialog ref
    const dialog = useRef<HTMLDialogElement>(null);
  
    useImperativeHandle(ref, () => {
      return {
        open() {
        //   console.log('OPENING');
          dialog.current?.showModal();
        },
      };
    });
  
    return createPortal(
        <dialog className='modal' ref={dialog} onClose={onClose}>
            {children}
        </dialog>, document.getElementById('modal-root')!
    );
  });
  
  export default Modal;
  