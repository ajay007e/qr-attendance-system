import { Button } from "@/shared";
import { TABS } from "../../constants";
import { TabsProps } from "../../types";

export function Tabs({ activeTab, onChange }: TabsProps) {
  return (
    <div className="flex rounded-xl bg-gray-100 p-1">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        const activeClass = isActive
          ? "bg-white text-blue-600 shadow-sm"
          : "text-gray-500";

        return (
          <Button
            key={tab.key}
            type="button"
            variant="ghost"
            onClick={() => onChange(tab.key)}
            className={`flex-1 rounded-lg px-2 py-2.5 text-xs font-medium sm:text-sm ${activeClass}`}
          >
            {tab.label}
          </Button>
        );
      })}
    </div>
  );
}
