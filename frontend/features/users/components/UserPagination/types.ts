export interface UserPaginationProps {
  total: number;
  page?: number;
  totalPages?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  disabled?: boolean;
  hasPrevious?: boolean;
  hasNext?: boolean;
}
