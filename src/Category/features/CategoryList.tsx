import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import formatDate from "Base/utils/formatters/formatDate";
import {
  Category,
  useAllCategoryService,
} from "Category/data/CategoryRepository";

const CategoryList = () => {
  const { t } = useTranslation("category");

  const { loading, categoryList } = useAllCategoryService();

  const columns: BaseColumn<Category>[] = useMemo(
    () => [
      {
        label: t("Nombre"),
        selector: (row) => row.description,
      },
    ],
    [t]
  );

  return (
    <>
      <DataTable columns={columns} data={categoryList} loading={loading} />
    </>
  );
};

export default CategoryList;
