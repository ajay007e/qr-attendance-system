import { Tab } from "./types";

const tabs: { key: Tab; label: string }[] = [
  { key: "details", label: "Details" },
  { key: "password", label: "Password" },
  { key: "delete", label: "Delete" },
];

export function Tabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex rounded-xl bg-gray-100 p-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        let activeClass = "text-gray-500";

        if (isActive) {
          activeClass =
            tab.key === "delete"
              ? "bg-white text-red-600 shadow-sm"
              : "bg-white text-blue-600 shadow-sm";
        }

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className={`
              flex-1
              rounded-lg
              px-2
              py-2.5
              text-xs
              font-medium
              transition
              sm:text-sm
              ${activeClass}
            `}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
