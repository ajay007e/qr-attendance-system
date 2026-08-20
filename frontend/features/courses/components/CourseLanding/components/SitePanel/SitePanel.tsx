import { BookOpen, ChevronDown } from "lucide-react";
import { SITE_SECTIONS } from "../../constants";
import { Section, SectionHeader } from "@/shared";
import { CourseHeader } from "../CourseHeader/CourseHeader";
import { SiteTabProps } from "../../types";

export function SiteTab({ offering }: SiteTabProps) {
  return (
    <Section>
      <CourseHeader offering={offering} />
      <SectionHeader title="Course Site" subtitle="Course materials, learning resources and assessment information." />
      {SITE_SECTIONS.map((section, index) => {
        const Icon = section.icon;
        return (
          <details
            key={section.title}
            open={index === 0}
            className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                <Icon size={19} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900">{section.title}</h3>
                <p className="mt-0.5 text-sm text-gray-500">{section.description}</p>
              </div>
              <ChevronDown size={20} className="shrink-0 text-gray-400 transition-transform group-open:rotate-180" />
            </summary>

            <div className="border-t border-gray-100 px-5 py-5">
              <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-5 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-400 ring-1 ring-gray-200">
                  <BookOpen size={18} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{section.title} content coming soon</p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Course content will be available here once it has been added.
                  </p>
                </div>
              </div>
            </div>
          </details>
        );
      })}
    </Section>
  );
}
