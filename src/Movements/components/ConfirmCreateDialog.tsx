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
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={confirmRef} // Focus the confirm button initially
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={confirmRef} // Add ref here
              colorScheme="main"
              isLoading={isLoading}
              ml={3}
              onClick={onConfirm}
            >
              {"Confirmar"}
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              {"Cancelar"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmCreateModal;
