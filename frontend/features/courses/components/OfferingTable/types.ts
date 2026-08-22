import { CourseOffering } from "@/shared";

export interface OfferingTableProps {
  offerings: CourseOffering[];
  onEdit: (offering: CourseOffering) => void;
}

export type OfferingActionProps = {
  offering: CourseOffering;
  onEdit: (offering: CourseOffering) => void;
};
