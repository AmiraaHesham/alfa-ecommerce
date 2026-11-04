import { act, renderHook, waitFor } from "@testing-library/react";

import { useServerDataTable } from "../app/admin/hooks/useServerDataTable";
import { searchTable } from "../app/admin/services/adminTableService";

jest.mock("../app/admin/services/adminTableService", () => ({
  searchTable: jest.fn(),
}));

const columns = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    meta: {
      backendField: "name",
      dataType: "STRING",
      sortable: true,
      filterable: true,
      searchable: true,
    },
    cell: ({ row }) => row.original.name,
  },
  {
    id: "active",
    accessorKey: "active",
    header: "Active",
    meta: {
      backendField: "active",
      dataType: "BOOLEAN",
      sortable: true,
      filterable: true,
    },
    cell: ({ row }) => String(row.original.active),
  },
];

function page(content = [{ id: 1, name: "Ahmed" }], totalElements = 1) {
  return {
    content,
    totalElements,
    totalPages: 1,
    number: 0,
    size: 10,
    first: true,
    last: true,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}

function lastRequest() {
  return searchTable.mock.calls[searchTable.mock.calls.length - 1][1];
}

describe("useServerDataTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    searchTable.mockResolvedValue(page());
  });

  it("loads page zero with the configured page size", async () => {
    const { result } = renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
        getRowId: (row) => String(row.id),
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    expect(searchTable.mock.calls[0][0]).toBe("/api/admin/test/search");
    expect(lastRequest()).toMatchObject({
      page: 0,
      size: 10,
      filters: [],
      sorting: [],
    });
    await waitFor(() => expect(result.current.totalElements).toBe(1));
  });

  it("sends sorting as explicit backend fields and directions", async () => {
    const { result } = renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    act(() => {
      result.current.setSorting([{ id: "name", desc: false }]);
    });

    await waitFor(() => expect(searchTable.mock.calls.length).toBeGreaterThan(1));
    expect(lastRequest().sorting).toEqual([
      { field: "name", direction: "ASC" },
    ]);
  });

  it("sends multiple column filters using their metadata fields", async () => {
    const { result } = renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    act(() => {
      result.current.setColumnFilters([
        { id: "name", value: { operator: "CONTAINS", value: "Ahmed" } },
        { id: "active", value: { operator: "EQUALS", value: true } },
      ]);
    });

    await waitFor(() => expect(searchTable.mock.calls.length).toBeGreaterThan(1));
    expect(lastRequest().filters).toEqual([
      { field: "name", operator: "CONTAINS", value: "Ahmed" },
      { field: "active", operator: "EQUALS", value: true },
    ]);
  });

  it("debounces global search and resets the request to page zero", async () => {
    const { result } = renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    const callsBeforeSearch = searchTable.mock.calls.length;

    act(() => {
      result.current.setGlobalFilter("Ahmed");
    });

    expect(searchTable.mock.calls.length).toBe(callsBeforeSearch);

    await waitFor(
      () => {
        expect(searchTable.mock.calls.length).toBeGreaterThan(callsBeforeSearch);
      },
      { timeout: 1500 },
    );
    expect(lastRequest()).toMatchObject({
      page: 0,
      globalSearch: "Ahmed",
    });
  });

  it("passes base filters from the screen without exposing them as column filters", async () => {
    renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
        baseFilters: [
          { field: "userId", operator: "EQUALS", value: 42 },
        ],
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    expect(lastRequest().filters).toEqual([
      { field: "userId", operator: "EQUALS", value: 42 },
    ]);
  });

  it("changes the request page size when requested", async () => {
    const { result } = renderHook(() =>
      useServerDataTable({
        endpoint: "/api/admin/test/search",
        columns,
        pageSize: 10,
      }),
    );

    await waitFor(() => expect(searchTable).toHaveBeenCalled());
    act(() => {
      result.current.setPageSize(20);
    });

    await waitFor(() => expect(searchTable.mock.calls.length).toBeGreaterThan(1));
    expect(lastRequest().size).toBe(20);
  });
});
