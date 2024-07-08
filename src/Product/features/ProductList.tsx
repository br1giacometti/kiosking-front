import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import { Product, useAllProductService } from "Product/data/ProductRepository";

const ProductList = () => {
  const { t } = useTranslation("product");

  const { loading, productList } = useAllProductService();

  const columns: BaseColumn<Product>[] = useMemo(
    () => [
      {
        label: "id",
        selector: (row) => row.id,
      },
      {
        label: t("datatable.label.description"),
        selector: (row) => row.description,
      },
      {
        label: t("datatable.label.buyPrice"),
        selector: (row) => row.buyPrice,
      },
      {
        label: t("datatable.label.sellPrice"),
        selector: (row) => row.sellPrice,
      },
      {
        label: t("datatable.label.minimumQuantity"),
        selector: (row) => row.minimumQuantity,
      },
      {
        label: t("datatable.label.createdAt"),
        selector: (row) => formatDate(row.createdAt),
      },
    ],
    [t]
  );

  return (
    <>
      <DataTable columns={columns} data={productList} loading={loading} />
    </>
  );
};

export default ProductList;
