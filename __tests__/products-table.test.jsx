import { render, screen, waitFor } from "@testing-library/react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    const React = require("react");
    return React.createElement("img", {
      ...props,
      src: props.src || "/placeholder.png",
    });
  },
}));

import ProductsTable from "../app/admin/Products/components/ProductsTable";
import { IdProvider } from "../context/idContext";
import { RefreshProvider } from "../context/refreshContext";
import { searchTable } from "../app/admin/services/adminTableService";

jest.mock("../app/admin/services/adminTableService", () => ({
  searchTable: jest.fn(),
}));

const product = {
  itemId: 7,
  code: "SKU-7",
  nameEn: "Test Product",
  nameAr: "منتج تجريبي",
  price: 199.5,
  oldPrice: 220,
  favorite: false,
  active: true,
  available: true,
  itemCategory: {
    itemCategoryId: 3,
    nameEn: "Phones",
    nameAr: "هواتف",
  },
  images: [{ imageUrl: "test.jpg" }],
  createdDate: "2026-01-01T10:00:00",
};

function renderTable() {
  return render(
    <IdProvider>
      <RefreshProvider>
        <ProductsTable
          setIsFormOpen={jest.fn()}
          setIsEditMode={jest.fn()}
        />
      </RefreshProvider>
    </IdProvider>,
  );
}

describe("ProductsTable pilot", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchTable.mockResolvedValue({
      content: [product],
      totalElements: 1,
      totalPages: 1,
      number: 0,
      size: 10,
      first: true,
      last: true,
      numberOfElements: 1,
      empty: false,
    });
  });

  it("renders the verified API fields with the shared table", async () => {
    renderTable();

    await waitFor(() =>
      expect(
        screen.getAllByText(/Test Product|منتج تجريبي/).length,
      ).toBeGreaterThan(0),
    );
    expect(screen.getAllByText(/SKU-7/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Phones|هواتف/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/199.5/).length).toBeGreaterThan(0);
  });

  it("calls the admin products endpoint with the initial request contract", async () => {
    renderTable();

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    expect(searchTable.mock.calls[0][0]).toBe("/api/admin/items/search");
    expect(searchTable.mock.calls[0][1]).toMatchObject({
      page: 0,
      size: 10,
      filters: [],
      sorting: [],
    });
  });
});
