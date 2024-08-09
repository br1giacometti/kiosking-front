import { Box } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MovementListItem } from "Movements/data/MovementsRepository";
import { useMemo } from "react";
import {
  format,
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  subDays,
  subMonths,
  subYears,
  eachWeekOfInterval,
  eachMonthOfInterval,
  getISOWeek,
  eachDayOfInterval,
  endOfYear,
  startOfYear,
} from "date-fns";
import { es } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SalesChartProps {
  movementsList: MovementListItem[];
  selectedRange: string;
}

const SalesChart = ({ movementsList, selectedRange }: SalesChartProps) => {
  const data = useMemo(() => {
    const totalsByDate: { [key: string]: { sales: number; invoiced: number } } =
      {};

    let startDate: Date;
    let endDate: Date;
    let dateRange: Date[] = [];

    switch (selectedRange) {
      case "day":
        startDate = endDate = startOfDay(new Date());
        dateRange = [startDate];
        break;
      case "lastDay":
        startDate = endDate = startOfDay(subDays(new Date(), 1));
        dateRange = [startDate];
        break;
      case "lastWeek":
        startDate = startOfDay(subDays(new Date(), 6));
        endDate = endOfDay(new Date());
        dateRange = eachDayOfInterval({ start: startDate, end: endDate });
        break;
      case "lastMonth":
        startDate = startOfMonth(subMonths(new Date(), 1)); // Inicio del mes pasado
        endDate = endOfDay(new Date()); // Hasta hoy
        dateRange = eachWeekOfInterval({ start: startDate, end: endDate });
        break;
      case "lastYear":
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        dateRange = eachMonthOfInterval({ start: startDate, end: endDate });
        break;
      default:
        startDate = new Date();
        endDate = new Date();
        dateRange = [];
    }

    // Agrupación por semanas para el último mes
    const labels =
      selectedRange === "lastWeek"
        ? dateRange.map((date) => format(date, "EEEE dd MMMM", { locale: es }))
        : selectedRange === "lastMonth"
        ? dateRange.map((date) => {
            const weekStart = startOfWeek(date);
            const weekEnd = endOfWeek(date);
            return `Semana ${getISOWeek(weekStart)} (${format(
              weekStart,
              "dd MMM",
              { locale: es }
            )} - ${format(weekEnd, "dd MMM", { locale: es })})`;
          })
        : dateRange.map((date) =>
            format(
              date,
              selectedRange === "lastYear" ? "MMMM yyyy" : "dd MMMM yyyy",
              { locale: es }
            )
          );

    // Inicializar los totales por fecha
    labels.forEach((label) => {
      totalsByDate[label] = { sales: 0, invoiced: 0 };
    });

    // Filtrar y acumular movimientos
    movementsList.forEach((movement) => {
      const movementDate = startOfDay(new Date(movement.createdAt));
      let formattedDate: string;

      if (selectedRange === "lastWeek") {
        formattedDate = format(movementDate, "EEEE dd MMMM", { locale: es });
      } else if (selectedRange === "lastMonth") {
        const weekStart = startOfWeek(movementDate);
        const weekEnd = endOfWeek(movementDate);
        formattedDate = `Semana ${getISOWeek(weekStart)} (${format(
          weekStart,
          "dd MMM",
          { locale: es }
        )} - ${format(weekEnd, "dd MMM", { locale: es })})`;
      } else {
        formattedDate = format(
          movementDate,
          selectedRange === "lastYear" ? "MMMM yyyy" : "dd MMMM yyyy",
          {
            locale: es,
          }
        );
      }

      if (movementDate >= startDate && movementDate <= endDate) {
        if (totalsByDate[formattedDate]) {
          totalsByDate[formattedDate].sales += movement.value;
          if (movement.factureLink) {
            totalsByDate[formattedDate].invoiced += movement.value;
          }
        }
      }
    });

    // Preparar datos para el gráfico
    const salesData = labels.map((label) => totalsByDate[label]?.sales || 0);
    const invoicedData = labels.map(
      (label) => totalsByDate[label]?.invoiced || 0
    );

    return {
      labels,
      datasets: [
        {
          label: "Ventas",
          backgroundColor: "#3182CE",
          data: salesData,
        },
        {
          label: "Facturado",
          backgroundColor: "#68D391",
          data: invoicedData,
        },
      ],
    };
  }, [movementsList, selectedRange]);

  return (
    <Box width="100%" mb={6}>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </Box>
  );
};

export default SalesChart;
