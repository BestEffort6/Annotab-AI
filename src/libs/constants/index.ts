type COLORS =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'default';

export const DEFAULT_PAGINATION = {
  LIMIT: 10,
  PAGE: 1,
  SORT: 'id',
  ORDER: 'DESC',
};

export const PAGE_SIZES = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
];

export const ROLE_COLORS: Record<string, COLORS> = {
  OWNER: 'secondary',
  ADMIN: 'success',
  MEMBER: 'primary',
  GUEST: 'default',
};
