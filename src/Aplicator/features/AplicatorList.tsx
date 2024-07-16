import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import {
  Aplicator,
  useAllAplicatorService,
} from "Aplicator/data/AplicatorRepository";

const AplicatorList = () => {
  const { t } = useTranslation("aplicator");

  const { loading, aplicatorList } = useAllAplicatorService();

  const columns: BaseColumn<Aplicator>[] = useMemo(
    () => [
      {
        label: "id",
        selector: (row) => row.id,
      },
      {
        label: t("datatable.label.description"),
        selector: (row) => row.description,
      },
    ],
    [t]
  );

  return (
    <>
      <DataTable columns={columns} data={aplicatorList} loading={loading} />
    </>
  );
};

export default AplicatorList;
