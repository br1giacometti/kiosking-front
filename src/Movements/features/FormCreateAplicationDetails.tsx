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
  Spinner,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import {
  HomeModernIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DataTable, { BaseColumn } from "Base/components/DataTable";
import useCreateAplicationContext from "Movements/contexts/CreateBuyContext/hooks/useCreateAplicationContext";
import formatPrice from "Base/utils/formatters/formatPrice";
import { StockMovementDetail } from "Movements/schemas/CreateAplicationSchema";
import useSearchProducts from "Product/data/ProductRepository/hooks/useSearchProducts";
import { Product } from "Product/data/ProductRepository";

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

  // Búsqueda en backend con debounce de 500ms
  const [searchTerm, setSearchTerm] = useState("");
  const { products, loading, searchByBarcode } = useSearchProducts(searchTerm, 500);
  
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mostrar opciones cuando hay productos
  useEffect(() => {
    setShowOptions(products.length > 0 && searchTerm.length > 0);
  }, [products, searchTerm]);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleSelectProduct = useCallback(
    (product: Product) => {
      setSearchTerm("");
      setShowOptions(false);
      append({
        product: {
          productId: product.id,
          description: `${product.description} $ ${product.sellPrice}`,
          quantity: 1,
          sellPrice: product.sellPrice,
        },
        quantity: 1,
        sellPrice: product.sellPrice,
        description: `${product.description} $ ${product.sellPrice}`,
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

  // Para código de barras: búsqueda inmediata sin debounce
  const handleSearchKeyPress = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Cerrar dropdown con Escape
      if (e.key === "Escape") {
        setShowOptions(false);
        setSearchTerm("");
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        
        // EXCEPCIÓN: Si busca exactamente "1", buscar producto "Varios" directamente
        if (searchTerm === "1") {
          const variosProduct = await searchByBarcode("varios");
          if (variosProduct) {
            handleSelectProduct(variosProduct);
            return;
          }
        }

        // Lógica normal: buscar por código de barras o descripción
        const productFound = products.find(
          (p) =>
            p.barCode.toLowerCase() === searchTerm.toLowerCase() ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (productFound) {
          handleSelectProduct(productFound);
          return;
        }

        // Si no está en la lista, buscar en backend
        const product = await searchByBarcode(searchTerm);
        if (product) {
          handleSelectProduct(product);
        }
      }
    },
    [products, searchTerm, handleSelectProduct, searchByBarcode]
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
              ref={inputRef}
              placeholder="Buscar producto por nombre o código de barra"
              variant="outline"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyPress}
            />
            <InputRightElement>
              {loading ? (
                <Spinner size="sm" />
              ) : (
                <Icon as={MagnifyingGlassIcon} />
              )}
            </InputRightElement>
          </InputGroup>
          {showOptions && products.length > 0 && (
            <Box
              ref={dropdownRef}
              borderWidth={1}
              borderRadius="md"
              overflow="hidden"
              bg="white"
              shadow="md"
              w="full"
              mb={4}
              maxH="300px"
              overflowY="auto"
            >
              <Box p={4}>
                {products.map((product) => (
                  <Button
                    key={product.id}
                    w="full"
                    mb={2}
                    onClick={() => handleSelectProduct(product)}
                    justifyContent="flex-start"
                  >
                    {product.description} - ${product.sellPrice}
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
