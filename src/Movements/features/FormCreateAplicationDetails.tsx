import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Input,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState, useEffect } from "react";
import {
  HomeModernIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import useCreateAplicationContext from "Movements/contexts/CreateBuyContext/hooks/useCreateAplicationContext";
import useProductsOptions from "Movements/hooks/useProductsOptions";
import OptionItem from "Base/types/OptionItem";
import formatPrice from "Base/utils/formatters/formatPrice";
import { StockMovementDetail } from "Movements/schemas/CreateAplicationSchema";

interface StockMovementDetailWithId extends StockMovementDetail {
  id: string;
}

interface FormCreateAplicationDetailsProps {
  onTotalAmountChange: (amount: number) => void;
}

const FormCreateAplicationDetails = ({
  onTotalAmountChange,
}: FormCreateAplicationDetailsProps) => {
  const {
    stockMovementDetail: { fields, append, update, remove },
  } = useCreateAplicationContext();

  const { options } = useProductsOptions();

  type ProductOption = OptionItem<number> & {
    barCode: string;
    sellPrice: number;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<ProductOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(
    null
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (value) {
        setFilteredOptions(
          options.filter(
            (option) =>
              option.label.toLowerCase().includes(value.toLowerCase()) ||
              option.barCode.toLowerCase().includes(value.toLowerCase())
          )
        );
      } else {
        setFilteredOptions([]);
      }
    },
    [options]
  );

  const handleSelectProduct = useCallback(
    (product: ProductOption) => {
      setSelectedProduct(product);
      setSearchTerm("");
      setFilteredOptions([]);
      append({
        product: {
          productId: product.value,
          description: product.label,
          quantity: 1,
          sellPrice: product.sellPrice,
        },
        quantity: 1,
        sellPrice: product.sellPrice,
        description: product.label,
        wasFactued: true,
      });
    },
    [append]
  );

  const handleQuantityChange = useCallback(
    (index: number, value: number) => {
      update(index, { ...fields[index], quantity: value });
    },
    [fields, update]
  );

  const handlePriceChange = useCallback(
    (index: number, value: number) => {
      update(index, { ...fields[index], sellPrice: value });
    },
    [fields, update]
  );

  const handleDeleteProduct = useCallback(
    (index: number) => {
      remove(index);
    },
    [remove]
  );

  const handleSearchKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const product = options.find(
          (option) =>
            option.label.toLowerCase() === searchTerm.toLowerCase() ||
            option.barCode.toLowerCase() === searchTerm.toLowerCase()
        );
        if (product) {
          handleSelectProduct(product as ProductOption);
        }
      }
    },
    [options, searchTerm, handleSelectProduct]
  );

  const totalAmount = useMemo(
    () =>
      fields.reduce(
        (sum, item) => sum + (item.sellPrice ?? 0) * (item.quantity ?? 0),
        0
      ),
    [fields]
  );

  useEffect(() => {
    onTotalAmountChange(totalAmount);
  }, [totalAmount, onTotalAmountChange]);

  const columns: BaseColumn<StockMovementDetailWithId>[] = useMemo(
    () => [
      { label: "Producto", selector: (row) => row.product.description },
      {
        label: "Precio",
        selector: (row) => (
          <Input
            type="number"
            value={row.sellPrice ?? ""}
            onChange={(e) =>
              handlePriceChange(
                fields.findIndex((item) => item.id === row.id),
                Number(e.target.value)
              )
            }
          />
        ),
      },
      {
        label: "Cantidad",
        selector: (row) => (
          <Input
            type="number"
            value={row.quantity ?? ""}
            onChange={(e) =>
              handleQuantityChange(
                fields.findIndex((item) => item.id === row.id),
                Number(e.target.value)
              )
            }
          />
        ),
      },
      {
        label: "Total",
        selector: (row) =>
          formatPrice((row.sellPrice || 0) * (row.quantity || 0)),
      },
      {
        label: "Acciones",
        selector: (row) => (
          <Flex gap={2}>
            <Button
              onClick={() =>
                handleDeleteProduct(
                  fields.findIndex((item) => item.id === row.id)
                )
              }
              variant="outline"
              colorScheme="red"
              size="sm"
            >
              <Icon as={TrashIcon} w={4} h={4} />
            </Button>
          </Flex>
        ),
      },
    ],
    [fields, handleQuantityChange, handlePriceChange, handleDeleteProduct]
  );

  return (
    <Box w={{ base: "100%", md: "container.xl" }}>
      <Flex
        as="header"
        align="center"
        h="16"
        px={4}
        bg="main.500"
        color="white"
      >
        <Icon as={HomeModernIcon} w={6} h={6} mr={4} />
        <Heading as="h1" size="md">
          Punto de Venta
        </Heading>
      </Flex>
      <Flex mt={4} direction={{ base: "column", md: "row" }}>
        <VStack spacing={4} flex="1">
          <InputGroup mb={4}>
            <Input
              placeholder="Buscar producto por nombre o código de barra"
              variant="outline"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            <InputRightElement>
              <Icon as={MagnifyingGlassIcon} />
            </InputRightElement>
          </InputGroup>
          {filteredOptions.length > 0 && (
            <Box
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              bg="white"
              shadow="md"
              w="full"
              mb={4}
            >
              <Box p={4}>
                {filteredOptions.map((option) => (
                  <Button
                    key={option.value}
                    w="full"
                    mb={2}
                    onClick={() => handleSelectProduct(option)}
                  >
                    {option.label}
                  </Button>
                ))}
              </Box>
            </Box>
          )}
          <Box
            borderWidth={1}
            borderRadius="md"
            overflow="hidden"
            bg="white"
            shadow="md"
            w="full"
          >
            <DataTable columns={columns} data={fields} />
            <Box p={4} borderTopWidth={1}>
              <Flex justify="space-between" fontWeight="bold">
                <Text fontSize={30}>Monto Total</Text>
                <Text fontSize={30}>{formatPrice(totalAmount)}</Text>
              </Flex>
            </Box>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
};

export default FormCreateAplicationDetails;
