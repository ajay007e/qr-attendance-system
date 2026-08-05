"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, Trash2, UserPlus, X } from "lucide-react";

import { Badge } from "@/shared";
import CustomDropdown from "@/shared/components/ui/CustomDropDown";

type Lecturer = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

type AssignedLecturer = Lecturer & {
  role: string;
};

const ROLE_OPTIONS = [
  {
    label: "Primary",
    value: "Primary",
  },
  {
    label: "Secondary",
    value: "Secondary",
  },
  {
    label: "Tutor",
    value: "Tutor",
  },
];

const MOCK_LECTURERS: Lecturer[] = Array.from({ length: 80 }, (_, index) => ({
  id: index + 1,
  first_name: ["John", "Sarah", "Michael", "Emma", "David"][index % 5],
  last_name: ["Smith", "Williams", "Brown", "Wilson"][index % 4],
  email: `lecturer${index + 1}@example.com`,
}));

const INITIAL_ASSIGNED: AssignedLecturer[] = [
  {
    id: 100,
    first_name: "David",
    last_name: "Johnson",
    email: "david.johnson@example.com",
    role: "Primary",
  },
];

function searchLecturers(query: string, page: number, limit = 10) {
  return new Promise<{
    data: Lecturer[];
    hasMore: boolean;
  }>((resolve) => {
    setTimeout(() => {
      const filtered = MOCK_LECTURERS.filter((lecturer) => {
        const value =
          `${lecturer.first_name} ${lecturer.last_name} ${lecturer.email}`.toLowerCase();

        return value.includes(query.toLowerCase());
      });

      const start = (page - 1) * limit;

      resolve({
        data: filtered.slice(start, start + limit),
        hasMore: start + limit < filtered.length,
      });
    }, 500);
  });
}

export function LecturersTab() {
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<Lecturer[]>([]);

  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null,
  );

  const [selectedRole, setSelectedRole] = useState("");

  const [assignedLecturers, setAssignedLecturers] =
    useState<AssignedLecturer[]>(INITIAL_ASSIGNED);

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(false);

  async function loadLecturers(nextPage = 1, append = false) {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);

    const response = await searchLecturers(query, nextPage);

    setResults((current) =>
      append ? [...current, ...response.data] : response.data,
    );

    setPage(nextPage);
    setHasMore(response.hasMore);

    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      loadLecturers();
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  function selectLecturer(lecturer: Lecturer) {
    setSelectedLecturer(lecturer);

    setQuery("");
    setResults([]);
    setOpen(false);
  }

  function assignLecturer() {
    if (!selectedLecturer || !selectedRole) {
      return;
    }

    const exists = assignedLecturers.some(
      (item) => item.id === selectedLecturer.id,
    );

    if (exists) {
      return;
    }

    setAssignedLecturers((current) => [
      ...current,
      {
        ...selectedLecturer,
        role: selectedRole,
      },
    ]);

    setSelectedLecturer(null);
    setSelectedRole("");
  }

  function removeLecturer(id: number) {
    setAssignedLecturers((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="space-y-5">
      <section
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-4
          sm:p-5
        "
      >
        <div className="mb-5">
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Assign Lecturer
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-600
            "
          >
            Search and assign lecturers to this course.
          </p>
        </div>

        {!selectedLecturer && (
          <div className="relative">
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Search Lecturer
            </label>

            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-gray-300
                bg-white
                px-4
                py-3
                transition
                focus-within:border-blue-600
                focus-within:ring-4
                focus-within:ring-blue-100
              "
            >
              <Search size={18} className="text-gray-500" />

              <input
                value={query}
                onFocus={() => setOpen(true)}
                onChange={(event) => {
                  setQuery(event.target.value);

                  setOpen(true);
                }}
                placeholder="Search by name or email"
                className="
                  flex-1
                  bg-transparent
                  text-sm
                  text-gray-700
                  outline-none
                  placeholder:text-gray-400
                "
              />

              {loading && (
                <Loader2
                  size={18}
                  className="
                    animate-spin
                    text-blue-600
                  "
                />
              )}
            </div>

            {open && results.length > 0 && (
              <div
                className="
                    absolute
                    z-30
                    mt-2
                    max-h-[320px]
                    w-full
                    overflow-y-auto
                    rounded-xl
                    border
                    border-gray-200
                    bg-white
                    shadow-xl
                  "
              >
                {results.map((lecturer) => (
                  <button
                    key={lecturer.id}
                    type="button"
                    onClick={() => selectLecturer(lecturer)}
                    className="
                          flex
                          w-full
                          items-center
                          gap-4
                          px-4
                          py-3
                          text-left
                          transition
                          hover:bg-blue-50
                        "
                  >
                    <div
                      className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-blue-100
                            font-semibold
                            text-blue-700
                          "
                    >
                      {lecturer.first_name[0]}
                      {lecturer.last_name[0]}
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                              truncate
                              text-sm
                              font-medium
                              text-gray-900
                            "
                      >
                        {lecturer.first_name} {lecturer.last_name}
                      </p>

                      <p
                        className="
                              truncate
                              text-sm
                              text-gray-600
                            "
                      >
                        {lecturer.email}
                      </p>
                    </div>
                  </button>
                ))}

                {hasMore && (
                  <button
                    type="button"
                    onClick={() => loadLecturers(page + 1, true)}
                    className="
                        w-full
                        border-t
                        border-gray-200
                        py-3
                        text-sm
                        font-medium
                        text-blue-600
                        hover:bg-blue-50
                      "
                  >
                    Load more lecturers
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {selectedLecturer && (
          <div
            className="
              flex
              items-start
              justify-between
              gap-3
              rounded-xl
              border
              border-blue-200
              bg-blue-50
              p-4
            "
          >
            <div className="min-w-0">
              <p
                className="
                  truncate
                  font-semibold
                  text-gray-900
                "
              >
                {selectedLecturer.first_name} {selectedLecturer.last_name}
              </p>

              <p
                className="
                  truncate
                  text-sm
                  text-gray-600
                "
              >
                {selectedLecturer.email}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedLecturer(null)}
              className="
                rounded-lg
                p-2
                text-gray-600
                hover:bg-blue-100
              "
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="mt-5">
          <label
            className="
              mb-2
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Lecturer Role
          </label>

          <CustomDropdown
            value={selectedRole}
            options={ROLE_OPTIONS}
            onChange={setSelectedRole}
            placeholder="Select lecturer role"
          />
        </div>

        <button
          type="button"
          onClick={assignLecturer}
          disabled={!selectedLecturer || !selectedRole}
          className="
            mt-5
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:opacity-50

            sm:w-auto
            sm:px-8
          "
        >
          <UserPlus size={18} />
          Assign Lecturer
        </button>
      </section>

      <section
        className="
          overflow-hidden
          rounded-xl
          border
          border-gray-200
          bg-white
        "
      >
        <div
          className="
            border-b
            border-gray-200
            px-4
            py-4

            sm:px-5
          "
        >
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Assigned Lecturers
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-600
            "
          >
            Lecturers currently assigned to this course.
          </p>
        </div>

        <div
          className="
            max-h-[340px]
            divide-y
            divide-gray-200
            overflow-y-auto
          "
        >
          {assignedLecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="
                  flex
                  flex-col
                  gap-3
                  px-4
                  py-4

                  sm:flex-row
                  sm:items-center
                  sm:justify-between

                  sm:px-5
                "
            >
              <div
                className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                  "
              >
                <div
                  className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                      font-semibold
                      text-gray-700
                    "
                >
                  {lecturer.first_name[0]}
                  {lecturer.last_name[0]}
                </div>

                <div className="min-w-0">
                  <p
                    className="
                        truncate
                        font-semibold
                        text-gray-900
                      "
                  >
                    {lecturer.first_name} {lecturer.last_name}
                  </p>

                  <p
                    className="
                        truncate
                        text-sm
                        text-gray-600
                      "
                  >
                    {lecturer.email}
                  </p>
                </div>
              </div>

              <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-3

                    sm:justify-end
                  "
              >
                <Badge variant="blue">{lecturer.role}</Badge>

                <button
                  type="button"
                  onClick={() => removeLecturer(lecturer.id)}
                  className="
                      rounded-lg
                      p-2
                      text-red-600
                      transition
                      hover:bg-red-50
                    "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {!assignedLecturers.length && (
            <div
              className="
                px-5
                py-8
                text-center
                text-sm
                text-gray-600
              "
            >
              No lecturers assigned.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
