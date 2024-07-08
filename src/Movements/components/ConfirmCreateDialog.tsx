import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useTranslation } from "Base/i18n";

interface ConfirmCreateModalProps {
  title: string;
  description: string;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCreateModal = ({
  description,
  isLoading,
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmCreateModalProps) => {
  const { t } = useTranslation("movements");
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {t("createMovement.modal.button.buttonCancel")}
            </Button>
            <Button
              colorScheme="main"
              isLoading={isLoading}
              ml={3}
              onClick={onConfirm}
            >
              {t("createMovement.modal.button.buttonConfirm")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmCreateModal;
