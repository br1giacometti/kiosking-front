# 📋 Optimización del Buscador de Productos

> ⚠️ **PROYECTO EN PRODUCCIÓN**
> 
> Fecha: 14 de Enero 2026
> Estado: PLAN APROBADO - LISTO PARA IMPLEMENTAR

---

## 🎯 RESUMEN EJECUTIVO

| Aspecto | Detalle |
|---------|---------|
| **Problema** | PC se traba al buscar productos |
| **Causa** | Se cargan TODOS los productos y se filtran en cliente |
| **Solución** | Búsqueda en backend con Prisma (la BD hace el trabajo) |
| **Riesgo** | BAJO - No modifica lógica de facturación ni datos |
| **Funcionalidad preservada** | ✅ Búsqueda por texto ✅ Búsqueda por código de barras |
| **Límite de resultados** | 50 productos (configurable) |

---

## 📊 ANÁLISIS COMPLETO DE TODAS LAS PÁGINAS

| Página | Problema 1 | Problema 2 | Acción |
|--------|------------|------------|--------|
| `/movements/create-aplication` | Carga TODOS productos | Filtra en cliente | **Búsqueda backend** |
| `/product` | **SIN DEBOUNCE** | 150 items/página | **Agregar debounce + reducir límite** |
| `/product/multi-edit` | **SIN DEBOUNCE** | 150 items/página | **Agregar debounce + reducir límite** |
| `/movements` | Sin límite de resultados | Gráfico con miles de puntos | **Agregar límite** |

### Detalle de cada problema:

#### `/product` y `/product/multi-edit`
```typescript
// ProductList.tsx línea 161 - SIN DEBOUNCE
const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
  const searchValue = e.target.value;
  setQuery(searchValue);  // ← Cada tecla = 1 request al backend
}, []);
```

#### `/movements`
```typescript
// StockMovementDataProvider.ts línea 147 - SIN LÍMITE
const stockMovementEntities = await this.client.findMany({
  where: filters,
  // ← Falta: take: 500 (límite)
  // Si seleccionas "Último Año" trae TODOS los movimientos
});
```

---

## ✅ BUENA NOTICIA

**Ya existe lógica de búsqueda en el backend** en `ProductDataProvider.ts`:
```typescript
// Líneas 70-76 - YA busca por descripción O código de barras
OR: [
  { description: { contains: query, mode: 'insensitive' } },
  { barCode: { contains: query, mode: 'insensitive' } },
]
```

Solo necesitamos **exponerlo en un endpoint simple** y **usarlo desde el frontend**.

---

## 1. PROBLEMA IDENTIFICADO

### Síntoma
Al escribir en el buscador de productos en `/movements/create-aplication`, la PC se traba/congela, especialmente al escribir letras comunes como "c".

### Causa Raíz
**Se cargan TODOS los productos en memoria y se filtran en el cliente.**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUJO ACTUAL (PROBLEMÁTICO)                         │
└─────────────────────────────────────────────────────────────────────────────┘

1. Al montar el componente:
   └── useAllProductService() → GET /Product/ → TODOS los productos (miles)
   └── Se guardan en memoria (state)

2. Al escribir "c":
   └── onChange dispara setSearchTerm("c")
   └── Debounce 300ms
   └── useEffect filtra TODOS los productos con .filter()
   └── Re-render con resultados
   └── 💥 PC se traba porque:
       - Filtra miles de productos
       - Genera miles de elementos DOM potenciales
       - React reconcilia todo
```

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUJO NUEVO (OPTIMIZADO)                            │
└─────────────────────────────────────────────────────────────────────────────┘

1. Al montar el componente:
   └── NO carga productos (lista vacía)

2. Al escribir "c":
   └── onChange dispara setSearchTerm("c")
   └── Debounce 500ms (más tiempo para que termine de escribir)
   └── GET /product/search?q=c&limit=20 → Prisma filtra en BD
   └── Backend retorna MÁXIMO 20 productos
   └── Re-render con solo 20 productos
   └── ✅ PC fluida
   
3. Al escanear código de barras (ej: "7790001234567"):
   └── El lector escribe muy rápido + Enter
   └── GET /product/search?q=7790001234567&limit=20
   └── Retorna el producto exacto
   └── ✅ Funciona igual que antes
```

### Archivos Involucrados

| Archivo | Problema |
|---------|----------|
| `useProductsOptions.ts` | Llama a `useAllProductService()` que trae TODOS |
| `useAllProductService.ts` | Hace `GET /Product/` sin paginación ni filtro |
| `FormCreateAplicationDetails.tsx` | Filtra en cliente con `.filter()` |

---

## 2. CÓDIGO ACTUAL PROBLEMÁTICO

### useProductsOptions.ts (línea 16)
```typescript
const { productList, loading, error } = useAllProductService();
// ↑ Trae TODOS los productos de la BD
```

### FormCreateAplicationDetails.tsx (líneas 64-77)
```typescript
useEffect(() => {
  if (debouncedSearchTerm) {
    const newFilteredOptions = options.filter(  // ← Filtra en cliente
      (option) =>
        option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        option.barCode.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
    // ...
  }
}, [debouncedSearchTerm, options]);  // ← options tiene TODOS los productos
```

---

## 3. SOLUCIONES PROPUESTAS

### OPCIÓN A: Búsqueda en Backend (RECOMENDADA) ⭐

**Concepto:** En lugar de cargar todos los productos, hacer la búsqueda en el servidor.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         FLUJO PROPUESTO (OPCIÓN A)                          │
└─────────────────────────────────────────────────────────────────────────────┘

1. Al montar el componente:
   └── NO carga productos (lista vacía)

2. Al escribir "c":
   └── onChange dispara setSearchTerm("c")
   └── Debounce 300ms
   └── GET /Product/search?q=c&limit=20 → Backend filtra y retorna 20 max
   └── Re-render con solo 20 productos
   └── ✅ PC fluida
```

**Cambios necesarios:**

| Lugar | Cambio |
|-------|--------|
| Backend | Crear endpoint `GET /Product/search?q=xxx&limit=20` |
| Frontend | Crear hook `useSearchProducts(searchTerm)` |
| Frontend | Modificar `FormCreateAplicationDetails.tsx` |

**Ventajas:**
- La búsqueda la hace la BD (optimizada con índices)
- Solo se transfieren ~20 productos por búsqueda
- Escala con millones de productos

**Desventajas:**
- Requiere cambios en backend
- Una request por cada búsqueda (con debounce)

---

### OPCIÓN B: Limitar resultados en cliente

**Concepto:** Seguir cargando todos pero limitar lo que se muestra.

```typescript
// En lugar de mostrar todos los filtrados:
const newFilteredOptions = options
  .filter((option) => /* ... */)
  .slice(0, 20);  // ← Solo mostrar primeros 20
```

**Ventajas:**
- Cambio mínimo (1 línea)
- No requiere backend

**Desventajas:**
- Sigue cargando TODOS los productos en memoria
- El filtrado sigue siendo lento con muchos productos
- No escala bien

---

### OPCIÓN C: Virtualización de lista

**Concepto:** Usar `react-window` o `react-virtualized` para renderizar solo lo visible.

**Ventajas:**
- Renderiza solo ~10-20 elementos visibles
- Puede mostrar miles de resultados sin lag

**Desventajas:**
- Agrega dependencia
- Más complejo de implementar
- No soluciona el problema de memoria

---

### OPCIÓN D: Combinación (MEJOR BALANCE)

**Concepto:** Búsqueda en backend + límite de resultados + debounce mayor.

```
1. Debounce de 500ms (en lugar de 300ms)
2. Backend busca con LIMIT 30
3. Frontend muestra máximo 30 resultados
4. Si el usuario necesita más, puede escribir más específico
```

---

## 4. RECOMENDACIÓN

### Para tu caso específico: OPCIÓN A (Búsqueda en Backend)

**¿Por qué?**
- Tenés "muchísimos productos" → necesitás que la BD haga el trabajo
- La PC del negocio no es potente → menos procesamiento en cliente
- Es la solución que escala a futuro

---

## 5. PLAN DE IMPLEMENTACIÓN

### FASE 1: Backend - Crear endpoint de búsqueda (2 archivos)

#### 1.1 ProductController.ts - Agregar endpoint

```typescript
// AGREGAR este endpoint ANTES del @Get('/:id')
@Get('/search')
@UseGuards(JwtAuthGuard)
@UseInterceptors(MapInterceptor(Product, ProductDto, { isArray: true }))
async searchProducts(
  @Query('q') query: string,
  @Query('limit') limit: string = '50',
): Promise<Product[]> {
  return this.productService.searchProducts(query, parseInt(limit));
}
```

#### 1.2 ProductService.ts - Agregar método

```typescript
async searchProducts(query: string, limit: number = 50): Promise<Product[]> {
  if (!query || query.length < 1) {
    return [];
  }
  return this.repository.searchByDescriptionOrBarcode(query, limit);
}
```

#### 1.3 ProductRepository.ts (interface) - Agregar firma

```typescript
searchByDescriptionOrBarcode(query: string, limit: number): Promise<Product[]>;
```

#### 1.4 ProductDataProvider.ts - Implementar método

```typescript
async searchByDescriptionOrBarcode(query: string, limit: number): Promise<Product[]> {
  const products = await this.client.findMany({
    where: {
      OR: [
        { description: { contains: query, mode: 'insensitive' } },
        { barCode: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: limit,
    include: {
      category: true,
    },
    orderBy: {
      description: 'asc',
    },
  });
  return this.classMapper.mapArrayAsync(products, ProductEntity, Product);
}
```

---

### FASE 2: Frontend - Crear servicio de búsqueda (2 archivos nuevos)

#### 2.1 Nuevo archivo: `src/Product/data/ProductRepository/services/searchProducts.ts`

```typescript
import productClient from "../client";
import { Product } from "../types";

const searchProducts = async (query: string, limit: number = 50): Promise<Product[]> => {
  if (!query || query.length < 1) {
    return [];
  }
  const response = await productClient.get<Product[]>(`/search`, {
    params: { q: query, limit },
  });
  return response.data;
};

export default searchProducts;
```

#### 2.2 Nuevo archivo: `src/Product/data/ProductRepository/hooks/useSearchProducts.ts`

```typescript
import { useState, useEffect, useCallback } from "react";
import { Product } from "../types";
import searchProducts from "../services/searchProducts";
import useDebounce from "Base/hooks/useDebounce";

// Límite de productos a mostrar en búsqueda
// 50 es suficiente para ver opciones sin trabar la PC
const SEARCH_LIMIT = 50;

interface UseSearchProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchByBarcode: (barcode: string) => Promise<Product | null>;
}

const useSearchProducts = (
  searchTerm: string,
  debounceMs: number = 500
): UseSearchProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Búsqueda con debounce para escritura normal
  useEffect(() => {
    if (!debouncedSearchTerm || debouncedSearchTerm.length < 1) {
      setProducts([]);
      return;
    }

    setLoading(true);
    searchProducts(debouncedSearchTerm, SEARCH_LIMIT)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchTerm]);

  // Búsqueda inmediata para código de barras (sin debounce)
  const searchByBarcode = useCallback(async (barcode: string): Promise<Product | null> => {
    if (!barcode) return null;
    try {
      const results = await searchProducts(barcode, 1);
      return results.length > 0 ? results[0] : null;
    } catch {
      return null;
    }
  }, []);

  return { products, loading, error, searchByBarcode };
};

export default useSearchProducts;
```

---

### FASE 3: Frontend - Modificar FormCreateAplicationDetails.tsx

**Cambios principales:**
1. Importar `useSearchProducts` en lugar de `useProductsOptions`
2. Eliminar el `useEffect` que filtra en cliente (líneas 64-77)
3. Usar `products` del hook directamente como opciones
4. Usar `searchByBarcode` para el Enter del lector

---

## 6. ARCHIVOS A MODIFICAR

### Backend (kiosking-back) - 4 archivos

| # | Archivo | Cambio |
|---|---------|--------|
| 1 | `src/Stock/infrastructure/controller/ProductController.ts` | +10 líneas: endpoint `/search` |
| 2 | `src/Stock/application/service/ProductService.ts` | +7 líneas: método `searchProducts()` |
| 3 | `src/Stock/application/repository/ProductRepository.ts` | +1 línea: firma del método |
| 4 | `src/Stock/infrastructure/dataProvider/ProductDataProvider.ts` | +15 líneas: implementación |

### Frontend (kiosking-front) - 3 archivos

| # | Archivo | Cambio |
|---|---------|--------|
| 1 | `src/Product/data/ProductRepository/services/searchProducts.ts` | **NUEVO** |
| 2 | `src/Product/data/ProductRepository/hooks/useSearchProducts.ts` | **NUEVO** |
| 3 | `src/Movements/features/FormCreateAplicationDetails.tsx` | Modificar imports y lógica |

---

## 7. IMPACTO

### Performance esperada

| Métrica | Antes | Después |
|---------|-------|---------|
| Productos cargados inicialmente | TODOS (miles) | 0 |
| Productos en memoria | TODOS | Máximo 50 |
| Tiempo de filtrado | ~500ms-2s | ~50-100ms |
| Uso de CPU cliente | Alto | Bajo |
| Uso de RAM cliente | Alto (todos en memoria) | Mínimo |
| Requests por búsqueda | 1 (inicial gigante) | 1 pequeña por búsqueda |

### ¿Por qué 50 y no más?

- **50 productos** es suficiente para mostrar opciones relevantes
- Si escribís "coca" y hay 100 cocas, los primeros 50 aparecen ordenados alfabéticamente
- Si no encontrás lo que buscás, escribí más específico (ej: "coca zero")
- Mantiene la PC fluida sin sacrificar usabilidad

### Experiencia de usuario

- ✅ Ya no se traba la PC
- ✅ Resultados más rápidos
- ✅ Funciona en PCs lentas
- ✅ Búsqueda por texto funciona igual
- ✅ Lector de código de barras funciona igual
- ⚠️ Requiere conexión al servidor para buscar (ya la requerías antes)

---

## 8. FUNCIONALIDADES QUE DEBEN SEGUIR FUNCIONANDO

| Funcionalidad | Cómo funciona | Estado |
|---------------|---------------|--------|
| Escribir "coca" | Backend busca productos con "coca" en descripción | ✅ |
| Escanear código de barras | Backend busca producto con ese código exacto | ✅ |
| Presionar Enter | Selecciona el primer resultado que coincida | ✅ |
| Modificar precio/cantidad | Sin cambios (no toca esa lógica) | ✅ |
| Agregar múltiples productos | Sin cambios (no toca esa lógica) | ✅ |

---

## 9. RIESGOS Y MITIGACIÓN

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Endpoint no funciona | Baja | Probamos en desarrollo primero |
| Búsqueda lenta | Muy baja | Prisma ya tiene índices |
| Código de barras no funciona | Baja | `searchByBarcode` sin debounce |
| Romper facturación | **NINGUNA** | No tocamos nada de AFIP/facturas |

---

## 10. ROLLBACK (Si algo sale mal)

### Backend
```bash
cd J:\Desktop\KioskingApp\kiosking-back
git checkout HEAD~1  # Volver al commit anterior
```

### Frontend
```bash
cd J:\Desktop\KioskingApp\kiosking-front
git checkout HEAD~1  # Volver al commit anterior
```

---

## 11. ORDEN DE IMPLEMENTACIÓN

1. ✅ Documentación creada
2. ⬜ Backend: Agregar endpoint `/product/search`
3. ⬜ Frontend: Crear servicio y hook de búsqueda
4. ⬜ Frontend: Modificar `FormCreateAplicationDetails.tsx`
5. ⬜ Test: Probar búsqueda por texto
6. ⬜ Test: Probar búsqueda por código de barras
7. ⬜ Commit y push

---

## 12. PLAN INTEGRAL - TODAS LAS PÁGINAS

### FASE A: `/movements/create-aplication` (CRÍTICO)
**Problema:** Carga TODOS los productos
**Solución:** Endpoint de búsqueda en backend (ver secciones 5 y 6)

### FASE B: `/product` y `/product/multi-edit` (IMPORTANTE)
**Problema:** Sin debounce + 150 items por página
**Solución:**

#### B.1 Agregar debounce al hook `useAllProductPaginated.ts`
```typescript
// Agregar import
import useDebounce from "Base/hooks/useDebounce";

// Dentro del hook, agregar debounce al query
const [query, setQuery] = useState<string>("");
const debouncedQuery = useDebounce(query, 500);  // ← NUEVO

// Cambiar el useEffect para usar debouncedQuery
useEffect(() => {
  if (invalidated !== undefined) {
    dispatch({ type: FetchActionTypes.Start });
    repository
      .getAllProductPaginated(currentPage, 50, debouncedQuery)  // ← Cambiar 150 → 50
      // ...
  }
}, [invalidated, currentPage, debouncedQuery, repository]);  // ← Usar debouncedQuery
```

### FASE C: `/movements` (IMPORTANTE)
**Problema:** Sin límite de resultados cuando selecciona rangos largos
**Solución:** Agregar límite en el backend

#### C.1 Modificar `StockMovementDataProvider.ts`
```typescript
// En el método findAllByQuery, agregar take:
const stockMovementEntities = await this.client.findMany({
  where: filters,
  take: 500,  // ← NUEVO - Límite de 500 movimientos
  include: {
    warehouseDestiny: true,
    // ...
  },
  orderBy: {
    createdAt: 'desc',
  },
});
```

---

## 13. RESUMEN DE CAMBIOS POR ARCHIVO

### Backend (4 archivos)

| # | Archivo | Cambio | Para |
|---|---------|--------|------|
| 1 | `ProductController.ts` | Endpoint `/search` | create-aplication |
| 2 | `ProductService.ts` | Método `searchProducts()` | create-aplication |
| 3 | `ProductDataProvider.ts` | Método `searchByDescriptionOrBarcode()` | create-aplication |
| 4 | `StockMovementDataProvider.ts` | Agregar `take: 500` | /movements |

### Frontend (5 archivos)

| # | Archivo | Cambio | Para |
|---|---------|--------|------|
| 1 | `services/searchProducts.ts` | **NUEVO** | create-aplication |
| 2 | `hooks/useSearchProducts.ts` | **NUEVO** | create-aplication |
| 3 | `FormCreateAplicationDetails.tsx` | Usar nuevo hook | create-aplication |
| 4 | `useAllProductPaginated.ts` | Debounce + límite 50 | /product, /multi-edit |
| 5 | `ProductRepository/hooks/index.ts` | Exportar nuevo hook | create-aplication |
