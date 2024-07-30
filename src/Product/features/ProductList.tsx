import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import { Product, useAllProductService } from "Product/data/ProductRepository";
import formatPrice from "Base/utils/formatters/formatPrice";

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
        selector: (row) => formatPrice(row.sellPrice),
      },
      {
        label: t("datatable.label.sellPrice"),
        selector: (row) => row.category.description,
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
