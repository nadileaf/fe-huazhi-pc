'use client';
import { useState, createContext, useContext, useCallback } from 'react';
import {
  Modal,
  type ModalProps as _ModalProps,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from '@nextui-org/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedEffect } from '@/hooks/useHooks';

type ModalProps = Partial<_ModalProps> & {
  id: string | number;
  header?: React.ReactNode | ((modal: ModalProps) => React.ReactNode);
  body: React.ReactNode | ((modal: ModalProps) => React.ReactNode);
  footer?: React.ReactNode | ((modal: ModalProps) => React.ReactNode);
  resolve?: (result?: any) => void;
  reject?: (reason?: any) => void;
  close?: () => void;
};

type OpenModalProps = Omit<ModalProps, 'id'> & { id?: string };

type MessageBoxContextExposes = {
  alert: (message: React.ReactNode, title?: React.ReactNode) => Promise<any> | undefined;
  confirm: (message: any, title?: string) => Promise<any> | undefined;
  openModal: (modalContent: OpenModalProps) => Promise<any> | undefined;
  closeModal: (id: string) => void;
};

const MessageBoxContext = createContext<MessageBoxContextExposes>({} as MessageBoxContextExposes);

export const useMessageBoxContext = () => useContext(MessageBoxContext);

export const MessageBoxProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useDebouncedEffect(
    () => {
      setModals([]);
    },
    [pathname, searchParams],
    100,
  );

  const openModal = useCallback(({ classNames, id, ...modalContent }: OpenModalProps) => {
    return new Promise<any>((resolve, reject) => {
      const _id = typeof id !== 'undefined' ? id : Date.now().toString();
      const newModal: ModalProps = {
        id: _id,
        shadow: 'lg',
        ...modalContent,
        resolve,
        reject,
        close: () =>
          setTimeout(
            () => setModals((prevModals) => prevModals.filter((modal) => modal.id !== id)),
            100,
          ),
        classNames: {
          base: 'bg-background',
          header: 'pb-0',
          body: 'py-5',
          ...classNames,
        },
      };
      setModals((prevModals) => [...prevModals, newModal]);
      return newModal;
    });
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  }, []);

  const alert = useCallback(
    (message: ModalProps['body'], title?: ModalProps['header']) => {
      return openModal({
        header: title ?? 'Information',
        body: message,
        footer: ({ resolve, close }) => (
          <Button
            color="primary"
            onClick={() => {
              resolve?.();
              close?.();
            }}
          >
            OK
          </Button>
        ),
      });
    },
    [openModal],
  );

  const confirm = useCallback(
    (message: ModalProps['body'], title?: ModalProps['header']) => {
      return openModal({
        header: title ?? 'Confirm',
        body: message,
        footer: ({ resolve, reject, close }) => (
          <>
            <Button
              onClick={() => {
                reject?.();
                close?.();
              }}
              variant="light"
            >
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={() => {
                resolve?.();
                close?.();
              }}
            >
              OK
            </Button>
          </>
        ),
      });
    },
    [openModal],
  );

  const exposes = {
    alert,
    confirm,
    openModal,
    closeModal,
  };

  return (
    <>
      <MessageBoxContext.Provider value={exposes}>
        {children}
        {modals.map(({ id, resolve, reject, header, body, footer, close, ...rest }) => (
          <Modal
            {...rest}
            key={id}
            defaultOpen={true}
            scrollBehavior="inside"
            onClose={() => {
              reject?.(id);
              close?.();
            }}
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                  },
                },
                exit: {
                  y: -20,
                  opacity: 0,
                  transition: {
                    duration: 0.2,
                    ease: 'easeIn',
                  },
                },
              },
            }}
          >
            <ModalContent>
              {header && (
                <ModalHeader>
                  {typeof header === 'function'
                    ? header({ id, resolve, reject, close, header, body, footer, ...rest })
                    : header}
                </ModalHeader>
              )}
              <ModalBody>
                {typeof body === 'function'
                  ? body({ id, resolve, reject, header, close, body, footer, ...rest })
                  : body}
              </ModalBody>
              {footer && (
                <ModalFooter>
                  {typeof footer === 'function'
                    ? footer({ id, resolve, reject, close, header, body, footer, ...rest })
                    : footer}
                </ModalFooter>
              )}
            </ModalContent>
          </Modal>
        ))}
      </MessageBoxContext.Provider>
    </>
  );
};
