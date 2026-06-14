import { STATUS_CFG } from "./statusConfig";

export const STATUS_FILTERS = ["All", ...Object.keys(STATUS_CFG)] as const;
