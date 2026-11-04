import { postRequest } from "../../../utils/requestsUtils.js";
import type {
  ApiPage,
  ApiResponse,
  TableSearchRequest,
} from "../types/table.types";

/**
 * Executes an admin table search request.
 * The existing request utility keeps authentication/refresh behavior intact;
 * the optional signal enables request cancellation.
 */
export async function searchTable<T>(
  endpoint: string,
  request: TableSearchRequest,
  signal?: AbortSignal,
): Promise<ApiPage<T>> {
  const payload = (await postRequest(endpoint, request, "", false, {
    signal,
  })) as ApiResponse<ApiPage<T>>;

  if (!payload?.data) {
    throw new Error("Invalid table search response");
  }

  return payload.data;
}
