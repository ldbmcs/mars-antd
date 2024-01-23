export type PageResponse<T> = {
  current?: number;
  total?: number;
  pages?: number;
  size?: number;
  records?: T[];
};
