interface Props {
  active: boolean;
}

export default function UserStatusBadge({ active }: Props) {
  return (
    <span
      className={`
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
        ${active ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}
      `}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}
