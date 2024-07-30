import { ChangeEvent, useCallback, useMemo } from "react";

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
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductList = () => {
  const { t } = useTranslation("product");

  const {
    error,
    invalidateCache,
    loading,
    meta,
    productList,
    setQuery,
    currentPage,
    setCurrentPage,
    refetch,
  } = useAllProductPaginated();

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
    ],
    [t]
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
    </>
  );
};

export default ProductList;
