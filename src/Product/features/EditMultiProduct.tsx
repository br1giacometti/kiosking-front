// pages/index.tsx
import React, { FC } from "react";
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
import { Box } from "@chakra-ui/react";
import FormSectionLayout from "Base/layout/FormSectionLayout";
import styles from "./gridStyles.module.css"; // Import the CSS module

interface EditMultiProductProps {
  navigateToProduct: () => void;
}

const EditMultiProduct = ({ navigateToProduct }: EditMultiProductProps) => {
  const { loading, productList, refetch } = useAllProductService(); // Usa refetch en lugar de invalidateCache
  const { updateProduct } = useUpdateProductService();

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
      rowId: product.id.toString(), // Convertir id a string para rowId
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
    console.log("Cell changes:", changes);

    for (const change of changes) {
      if (change.type === "number" && change.columnId === "Precio") {
        const rowId = Number(change.rowId); // Convertir rowId a número
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
            console.log(
              `Successfully updated product with ID ${rowId} to new price: ${newPrice}`
            );

            // Refresca la lista de productos después de la actualización
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

  return (
    <FormSectionLayout>
      <Box p={100}>
        <div className={styles.fullWidthGrid}>
          <div className={styles.rgFlagCell}>
            <div className={styles.rgFlagWrapper}>
              <ReactGrid
                rows={rows}
                columns={columns}
                onCellsChanged={handleChanges}
              ></ReactGrid>
            </div>
          </div>
        </div>
      </Box>
    </FormSectionLayout>
  );
};

export default EditMultiProduct;
