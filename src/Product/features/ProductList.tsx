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
        label: t("datatable.label.description"),
        selector: (row) => row.description,
      },
      {
        label: t("datatable.label.sellPrice"),
        selector: (row) => row.sellPrice,
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
