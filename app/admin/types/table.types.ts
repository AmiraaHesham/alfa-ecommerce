import type { RowData } from "@tanstack/react-table";

export type TableDataType =
  | "STRING"
  | "NUMBER"
  | "DATE"
  | "DATETIME"
  | "BOOLEAN"
  | "ENUM";

export type FilterOperator =
  | "EQUALS"
  | "NOT_EQUALS"
  | "CONTAINS"
  | "NOT_CONTAINS"
  | "STARTS_WITH"
  | "ENDS_WITH"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUAL"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUAL"
  | "BETWEEN"
  | "IN"
  | "NOT_IN"
  | "IS_NULL"
  | "IS_NOT_NULL";

export type SortDirection = "ASC" | "DESC";

export interface FilterOption {
  label: string;
  value: string;
}

export interface TableColumnMeta {
  backendField?: string;
  dataType?: TableDataType;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  operators?: FilterOperator[];
  filterOptions?: FilterOption[];
  headerClassName?: string;
  cellClassName?: string;
  align?: "left" | "center" | "right";
  widthClass?: string;
}

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> extends TableColumnMeta {}
}

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value?: unknown;
}

export interface SortCondition {
  field: string;
  direction: SortDirection;
}

export interface TableSearchRequest {
  page: number;
  size: number;
  globalSearch?: string;
  filters: FilterCondition[];
  sorting: SortCondition[];
}

export interface ColumnFilterValue {
  operator: FilterOperator;
  value: unknown;
}

export interface ApiErrorPayload {
  code?: string;
  message?: string;
  details?: Record<string, string>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiErrorPayload;
}

export interface ApiPage<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}
