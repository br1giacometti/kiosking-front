import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import { Field, useAllFieldService } from "Field/data/FieldRepository";

const FieldList = () => {
  const { t } = useTranslation("field");

  const { loading, fieldList } = useAllFieldService();

  const columns: BaseColumn<Field>[] = useMemo(
    () => [
      {
        label: t("datatable.label.description"),
        selector: (row) => row.description,
      },
      {
        label: t("datatable.label.hectares"),
        selector: (row) => row.hectares,
      },
    ],
    [t]
  );

  return (
    <>
      <DataTable columns={columns} data={fieldList} loading={loading} />
    </>
  );
};

export default FieldList;
