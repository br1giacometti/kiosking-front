import { ChangeEvent, useCallback, useMemo, useState } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import { Product, useAllProductService } from "Product/data/ProductRepository";
import formatPrice from "Base/utils/formatters/formatPrice";
import useAllProductPaginated from "Product/data/ProductRepository/hooks/useAllProductPaginated";
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
import useDeletePersonService from "Product/data/ProductRepository/hooks/useDeleteProductService";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import ConfirmDeleteModal from "Product/components/ConfirmDeleteDialog";

type DeleteState = {
  loading: boolean;
  selected: Product | null;
};

interface ProductListProps {
  navigateToEdit: (product: Product) => void;
}
const ProductList = ({ navigateToEdit }: ProductListProps) => {
  const { t } = useTranslation("product");
  const toast = useToast();

  const {
    error,
    loading,
    meta,
    productList,
    setQuery,
    currentPage,
    setCurrentPage,
    refetch,
  } = useAllProductPaginated();

  const { isOpen, onClose, onOpen } = useDisclosure({ defaultIsOpen: false });
  const { deletePerson } = useDeletePersonService();

  const [deleteState, setDeleteState] = useState<DeleteState>({
    loading: false,
    selected: null,
  });

  const handleDelete = useCallback(
    (product: Product) => {
      setDeleteState({ loading: false, selected: product });
      onOpen();
    },
    [onOpen]
  );

  const onDelete = useCallback(() => {
    setDeleteState((prev) => ({ ...prev, loading: true }));
    if (deleteState.selected?.id) {
      deletePerson(deleteState.selected?.id)
        .then((deleted) => {
          if (deleted) {
            toast({
              title: `${deleteState.selected?.description} fue eliminado`,
              status: "success",
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: `El Producto no se pudo eliminar`,
            status: "error",
            isClosable: true,
          });
        })
        .finally(() => {
          setDeleteState({
            loading: false,
            selected: null,
          });
          onClose();
        });
    }
  }, [deletePerson, deleteState.selected, onClose, toast]);

  const columns: BaseColumn<Product>[] = useMemo(
    () => [
      {
        label: t("datatable.label.description"),
        selector: (row) => row.description,
      },
      {
        label: t("datatable.label.sellPrice"),
        selector: (row) => formatPrice(row.sellPrice),
      },
      {
        label: t("datatable.label.sellPrice"),
        selector: (row) => row.category.description,
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
              <Tooltip label={t("Eliminar")} placement="bottom">
                <IconButton
                  aria-label="Delete icon"
                  colorScheme="red"
                  icon={<DeleteIcon />}
                  isDisabled={
                    deleteState.loading && row.id !== deleteState.selected?.id
                  }
                  isLoading={
                    deleteState.loading && row.id === deleteState.selected?.id
                  }
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(row)}
                />
              </Tooltip>
            </Flex>
          </>
        ),
      },
    ],
    [
      deleteState.loading,
      deleteState.selected?.id,
      handleDelete,
      navigateToEdit,
      t,
    ]
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  }, []);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box>
          <InputGroup>
            <Input
              placeholder="Busca un producto"
              onChange={handleSearchChange}
            />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
      <DataTable columns={columns} data={productList} loading={loading} />
      {deleteState.selected && (
        <ConfirmDeleteModal
          description={deleteState.selected?.description}
          isLoading={deleteState.loading}
          isOpen={isOpen}
          title={t("Eliminar Producto", {
            description: deleteState.selected?.description,
          })}
          onClose={onClose}
          onConfirm={onDelete}
        />
      )}
    </>
  );
};

export default ProductList;
