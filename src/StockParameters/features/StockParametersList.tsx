import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import {
  StockParameters,
  useAllStockParametersService,
} from "StockParameters/data/StockParametersRepository";
import formatPrice from "Base/utils/formatters/formatPrice";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "StockParameters/components/ConfirmDeleteDialog";

type DeleteState = {
  loading: boolean;
  selected: StockParameters | null;
};

interface StockParametersListProps {
  navigateToEdit: (stockparameters: StockParameters) => void;
}
const StockParametersList = ({ navigateToEdit }: StockParametersListProps) => {
  const { t } = useTranslation("product");
  const toast = useToast();

  const { error, loading, stockparametersList, refetch } =
    useAllStockParametersService();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const columns: BaseColumn<StockParameters>[] = useMemo(
    () => [
      {
        label: t("Id"),
        selector: (row) => row.id,
      },
      {
        label: t("Monto maximo venta"),
        selector: (row) => formatPrice(row.maxSellAmount),
      },
      {
        label: t("Tope facturacion diario"),
        selector: (row) => formatPrice(row.dailySellAmount),
      },
      {
        label: t("Acciones"),
        selector: (row) => (
          <>
            <Flex gap={2}>
              <Tooltip label={t("Editar")} placement="bottom">
                <IconButton
                  aria-label="Edit icon"
                  colorScheme="gray"
                  icon={<EditIcon />}
                  isDisabled={
                    deleteState.loading && row.id !== deleteState.selected?.id
                  }
                  isLoading={
                    deleteState.loading && row.id === deleteState.selected?.id
                  }
                  size="sm"
                  variant="outline"
                  onClick={() => navigateToEdit(row)}
                />
              </Tooltip>
            </Flex>
          </>
        ),
      },
    ],
    [deleteState.loading, deleteState.selected?.id, navigateToEdit, t]
  );

  return (
    <>
      <DataTable
        columns={columns}
        data={stockparametersList}
        loading={loading}
      />
    </>
  );
};

export default StockParametersList;
