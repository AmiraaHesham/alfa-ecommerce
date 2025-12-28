// context/TableContext.js
import { createContext, useContext, useCallback, useState } from 'react';

// أنشئ الـ Context
const TableContext = createContext();

// Hook مخصص لسهولة الاستخدام
export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('useTable must be used within a TableProvider');
  }
  return context;
};

// مزود السياق (Provider)
export const TableProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ الدالة اللي عايزين نستعملها من أي كومبوننت تاني
  const loadProducts = useCallback(async (reset = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    const targetPage = reset ? 1 : page;
    setIsLoading(true);

    try {
      // محاكاة API — غيرها بـ fetch حقيقي
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newProducts = Array.from({ length: 10 }, (_, i) => ({
        id: (targetPage - 1) * 10 + i + 1,
        name: `Product ${(targetPage - 1) * 10 + i + 1}`,
        price: (Math.random() * 100).toFixed(2),
      }));

      if (reset) {
        setProducts(newProducts);
        setPage(2);
        setHasMore(true);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
        setPage(prev => prev + 1);
        if (newProducts.length < 10) setHasMore(false);
      }
    } catch (err) {
      console.error('Load failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, hasMore]);

  // أول تحميل
  const init = useCallback(() => {
    loadProducts(true);
  }, [loadProducts]);

  return (
    <TableContext.Provider
      value={{
       products,
        isLoading,
        hasMore,
        loadProducts, // ✅ دي اللي هتتشارك
        init,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};