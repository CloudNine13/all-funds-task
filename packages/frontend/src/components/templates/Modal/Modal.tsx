import { ModalType } from '@lib/types';
import { Modal as MUIModal } from '@mui/material';
import { AddModal, ConfirmModal } from '@organisms';
import { InfoModal } from 'src/components/organisms/SubModals/InfoModal';

type ModalProps = {
  modalType: ModalType | null;
  isModalOpen: boolean;
  handleCloseModal: () => void;
};

const Modal = ({ modalType, isModalOpen, handleCloseModal }: ModalProps) => {
  return (
    <MUIModal open={isModalOpen} onClose={handleCloseModal}>
      {modalType === ModalType.ADD ? (
        <AddModal handleClose={handleCloseModal} />
      ) : modalType === ModalType.CONFIRM ? (
        <ConfirmModal handleClose={handleCloseModal} />
      ) : modalType === ModalType.INFO ? (
        <InfoModal />
      ) : (
        <></>
      )}
    </MUIModal>
  );
};

export default Modal;
