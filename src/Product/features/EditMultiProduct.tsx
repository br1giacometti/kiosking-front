import React, {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  useEffect,
} from "react";
import { Product } from "Product/data/ProductRepository";
import useUpdateProductService from "Product/data/ProductRepository/hooks/useUpdateProductService";
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import styles from "./gridStyles.module.css";
import useAllProductPaginated from "Product/data/ProductRepository/hooks/useAllProductPaginated";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useCategoryOptions from "Product/hooks/useCategoryOptions";
import DataTable, { BaseColumn } from "Base/components/DataTable";

interface EditMultiProductProps {
  navigateToProduct: () => void;
}

const EditMultiProduct = ({ navigateToProduct }: EditMultiProductProps) => {
  const { updateProduct } = useUpdateProductService();
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
  const { options, loading: loading2 } = useCategoryOptions();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  }, []);

  const handleCategoryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const categoryId = e.target.value ? Number(e.target.value) : null;
      setSelectedCategory(categoryId);
      console.log("categoryId", categoryId);
    },
    []
  );

  useEffect(() => {
    let combinedQuery = "";
    if (searchQuery) {
      combinedQuery += `query=${searchQuery}`;
    }
    if (selectedCategory) {
      if (combinedQuery.length > 0) {
        combinedQuery += "&"; // Add "&" separator if search query already exists
      }
      combinedQuery += `&categoryId=${selectedCategory}`;
    }
    console.log("Combined Query:", combinedQuery); // Now shows "query=Coca&categoryId=2"
    setQuery(combinedQuery);
  }, [searchQuery, selectedCategory, setQuery]);

  const handlePriceChange = useCallback(
    async (productId: number, value: number) => {
      const productToUpdate = productList.find(
        (product) => product.id === productId
      );

      if (productToUpdate) {
        try {
          const updateBody = {
            description: productToUpdate.description,
            barCode: productToUpdate.barCode,
            sellPrice: value,
            categoryId: productToUpdate.categoryId,
          };

          await updateProduct(updateBody, productToUpdate.id);
          refetch();
        } catch (error) {
          console.error(`Error updating product with ID ${productId}:`, error);
        }
      } else {
        console.error(`Product with ID ${productId} not found.`);
      }
    },
    [productList, updateProduct, refetch]
  );

  const columns: BaseColumn<Product>[] = [
    { label: "Id", selector: (row) => row.id },
    { label: "Nombre", selector: (row) => row.description },
    {
      label: "Precio",
      selector: (row) => (
        <Input
          type="number"
          value={row.sellPrice || 0}
          onChange={(e) => handlePriceChange(row.id, Number(e.target.value))}
        />
      ),
    },
  ];

  return (
    <FormSectionLayout>
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
        <Box>
          <Select
            placeholder="Selecciona una categoría"
            onChange={handleCategoryChange}
            value={selectedCategory || ""}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <Box>
        <div className={styles.fullWidthGrid}>
          <DataTable columns={columns} data={productList} />
        </div>
      </Box>
    </FormSectionLayout>
  );
};

export default EditMultiProduct;
