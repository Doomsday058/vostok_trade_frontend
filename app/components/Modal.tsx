//app/components/Modal.tsx
'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
};

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside the modal
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (overlayRef.current === e.target) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;
  
  // Use portal to render modal outside of normal component hierarchy
  return createPortal(
    <div 
      ref={overlayRef}
      className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 opacity-100 scale-100 border border-gray-800"
        data-aos="zoom-in"
      >
        {/* Переработанный заголовок с flexbox для правильного позиционирования крестика */}
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          {title && (
            <h2 className="text-2xl font-russo text-white">{title}</h2>
          )}
          <button 
            onClick={onClose}
            className="ml-auto text-blue-500 hover:text-blue-300 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 flex-shrink-0"
            aria-label="Закрыть"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Содержимое модального окна */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}