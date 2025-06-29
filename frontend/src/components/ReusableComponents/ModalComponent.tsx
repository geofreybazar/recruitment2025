import type { ReactNode } from "react";
import { Box, Modal } from "@mui/material";
import type { SxProps, Theme } from "@mui/system";

interface ModalComponentProps {
  open: boolean;
  onClose: () => void;
  style: SxProps<Theme>;
  children: ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  open,
  onClose,
  style,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
