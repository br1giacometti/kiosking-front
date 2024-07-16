import { useMemo } from "react";

import { useTranslation } from "Base/i18n";
import DataTable, { BaseColumn } from "Base/components/DataTable";

import {
  Warehouse,
  useAllWarehouseService,
} from "Warehouse/data/WarehouseRepository";

const WarehouseList = () => {
  const { t } = useTranslation("warehouse");

  const { loading, warehouseList } = useAllWarehouseService();

  const columns: BaseColumn<Warehouse>[] = useMemo(
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
      <DataTable columns={columns} data={warehouseList} loading={loading} />
    </>
  );
};

export default WarehouseList;
