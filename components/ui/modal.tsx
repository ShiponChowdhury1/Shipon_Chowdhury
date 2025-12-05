'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({ children, open, onOpenChange }: ModalProps) {
  const [isOpen, setIsOpen] = useState(open || false);

  const openModal = () => {
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen: open ?? isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function ModalTrigger({ children }: { children: ReactNode }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('ModalTrigger must be used within Modal');

  return (
    <div onClick={context.openModal} className="cursor-pointer">
      {children}
    </div>
  );
}

export function ModalContent({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('ModalContent must be used within Modal');

  if (!context.isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={context.closeModal}
      />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto z-[9999]',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalHeader({ children, className }: { children: ReactNode; className?: string }) {
  const context = useContext(ModalContext);
  if (!context) throw new Error('ModalHeader must be used within Modal');

  return (
    <div className={cn('flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800', className)}>
      <div className="flex-1">{children}</div>
      <button
        onClick={context.closeModal}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <X size={20} className="text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
}

export function ModalTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cn('text-xl font-bold text-gray-900 dark:text-white', className)}>{children}</h2>;
}

export function ModalDescription({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-sm text-gray-600 dark:text-gray-400 mt-1', className)}>{children}</p>;
}

export function ModalBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-6', className)}>{children}</div>;
}

export function ModalFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50', className)}>
      {children}
    </div>
  );
}
