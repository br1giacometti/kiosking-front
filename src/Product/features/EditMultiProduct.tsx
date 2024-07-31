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
  Button,
  useToast,
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
  const toast = useToast();
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
  const [editedPrices, setEditedPrices] = useState<Map<number, number>>(
    new Map()
  );

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setQuery(searchValue);
  }, []);

  const handleCategoryChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const categoryId = e.target.value ? Number(e.target.value) : null;
      setSelectedCategory(categoryId);
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

  const handlePriceChange = useCallback((productId: number, value: number) => {
    setEditedPrices((prevPrices) => new Map(prevPrices).set(productId, value));
  }, []);

  const handleUpdatePrices = useCallback(async () => {
    try {
      for (const [productId, newPrice] of editedPrices.entries()) {
        const productToUpdate = productList.find(
          (product) => product.id === productId
        );

        if (productToUpdate) {
          const updateBody = {
            description: productToUpdate.description,
            barCode: productToUpdate.barCode,
            sellPrice: newPrice,
            categoryId: productToUpdate.categoryId,
          };

          await updateProduct(updateBody, productToUpdate.id);
        } else {
          console.error(`Product with ID ${productId} not found.`);
        }
      }
      refetch();
      setEditedPrices(new Map()); // Clear edited prices after update
      // Mostrar toast de éxito
      toast({
        title: "Precios actualizados.",
        description:
          "Los precios de los productos se han actualizado correctamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating products:", error);

      // Mostrar toast de error
      toast({
        title: "Error al actualizar precios.",
        description:
          "Hubo un error al intentar actualizar los precios de los productos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [editedPrices, productList, updateProduct, refetch, toast]);

  const columns: BaseColumn<Product>[] = [
    { label: "Id", selector: (row) => row.id },
    { label: "Nombre", selector: (row) => row.description },
    {
      label: "Precio",
      selector: (row) => (
        <Input
          type="number"
          value={editedPrices.get(row.id) || row.sellPrice || 0}
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
      <Box>
        <Button
          colorScheme="main"
          isLoading={loading}
          onClick={handleUpdatePrices}
        >
          Actualizar Precios
        </Button>
      </Box>
    </FormSectionLayout>
  );
};

export default EditMultiProduct;
