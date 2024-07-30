import React, {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  useEffect,
} from "react";
import {
  ReactGrid,
  Column,
  Row,
  CellChange,
  DefaultCellTypes,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { Product, useAllProductService } from "Product/data/ProductRepository";
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

  const getColumns = (): Column[] => [
    { columnId: "Id", width: 10, resizable: true },
    { columnId: "Nombre", width: 500, resizable: true },
    { columnId: "Precio", width: 200, resizable: true },
  ];

  const headerRow: Row = {
    rowId: "header",
    cells: [
      { type: "header", text: "Id" },
      { type: "header", text: "Nombre" },
      { type: "header", text: "Precio" },
    ],
  };

  const getRows = (products: Product[]): Row[] => [
    headerRow,
    ...products.map<Row>((product) => ({
      rowId: product.id.toString(),
      cells: [
        { type: "number", value: product.id },
        { type: "text", text: product.description },
        { type: "number", value: product.sellPrice },
      ],
    })),
  ];

  const rows = getRows(productList);
  const columns = getColumns();

  const handleChanges = async (changes: CellChange<DefaultCellTypes>[]) => {
    for (const change of changes) {
      if (change.type === "number" && change.columnId === "Precio") {
        const rowId = Number(change.rowId);
        const newPrice = change.newCell.value;

        const productToUpdate = productList.find(
          (product) => product.id === rowId
        );

        if (productToUpdate) {
          try {
            const updateBody = {
              description: productToUpdate.description,
              barCode: productToUpdate.barCode,
              sellPrice: newPrice,
              categoryId: productToUpdate.categoryId,
            };

            await updateProduct(updateBody, productToUpdate.id);

            refetch();
          } catch (error) {
            console.error(`Error updating product with ID ${rowId}:`, error);
          }
        } else {
          console.error(`Product with ID ${rowId} not found.`);
        }
      }
    }
  };

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
      <Box p={100}>
        <div className={styles.fullWidthGrid}>
          <div className={styles.rgFlagCell}>
            <div className={styles.rgFlagWrapper}>
              <ReactGrid
                rows={rows}
                columns={columns}
                onCellsChanged={handleChanges}
              />
            </div>
          </div>
        </div>
      </Box>
    </FormSectionLayout>
  );
};

export default EditMultiProduct;
