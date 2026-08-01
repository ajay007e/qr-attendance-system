"use client";

import { useState } from "react";

import PageHeader from "@/components/layout/AdminPageHeader";
import Modal from "@/components/common/Modal";
import PageLoader from "@/components/common/PageLoader";

import UserForm from "@/components/forms/UserForm";
import EditUserForm from "@/components/forms/EditUserForm";

import { useUsers } from "./hooks/useUsers";

import UserToolbar from "./components/UserToolbar";
import UserTable from "./components/UserTable";
import UserPagination from "./components/UserPagination";
import EmptyUserState from "./components/EmptyUserState";

import type { User, UserQuery } from "./types";
import { DEFAULT_USER_QUERY } from "./constants";
import { useDebounce } from "@/hooks/useDebounce";

export default function UserManagement() {
  const [query, setQuery] = useState<UserQuery>(DEFAULT_USER_QUERY);

  const [showCreateUser, setShowCreateUser] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const debouncedQuery = useDebounce(query, 400);
  const {
    users,
    pagination,
    loading,
    isFetching,
    error,
    refresh,
    createUser,
    updateUser,
    changePassword,
    changeStatus,
  } = useUsers(debouncedQuery);

  if (loading) {
    return <PageLoader />;
  }
  const hasFilters =
    Boolean(query.search) || Boolean(query.role) || Boolean(query.status);

  const showEmptyState = pagination.total === 0 && !hasFilters;

  const showNoResults = pagination.total === 0 && hasFilters;

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-700">Unable to load users</h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          onClick={refresh}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage administrators, lecturers, and student accounts."
      />
      <UserToolbar
        filters={query}
        onFiltersChange={(filters) =>
          setQuery({
            ...filters,
            page: 1,
          })
        }
        onCreate={() => setShowCreateUser(true)}
      />

      {showEmptyState ? (
        <EmptyUserState onCreate={() => setShowCreateUser(true)} />
      ) : showNoResults ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-15 text-center sm:py-20">
          <h3 className="text-lg font-semibold text-gray-900">
            No users found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={() => setQuery(DEFAULT_USER_QUERY)}
            className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          <div className="relative">
            {isFetching && (
              <div
                className="
                  absolute
                  inset-0
                  z-20
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/70
                  backdrop-blur-sm
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    bg-white
                    px-4
                    py-3
                    sm:px-5
                    text-sm
                    font-medium
                    text-gray-700
                    shadow-lg
                  "
                >
                  <svg
                    className="
                      h-5
                      w-5
                      animate-spin
                      text-blue-600
                    "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />

                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Loading users...
                </div>
              </div>
            )}

            <UserTable users={users} onEdit={setSelectedUser} />
          </div>

          <UserPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            count={pagination.count}
            limit={pagination.limit}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
            onPrevious={() =>
              setQuery((previous) => ({
                ...previous,
                page: previous.page! - 1,
              }))
            }
            onNext={() =>
              setQuery((previous) => ({
                ...previous,
                page: previous.page! + 1,
              }))
            }
          />
        </>
      )}

      <Modal
        open={showCreateUser}
        onClose={() => setShowCreateUser(false)}
        title="Create User"
        size="md"
      >
        <UserForm
          onSubmit={async (data) => {
            await createUser(data);
            setShowCreateUser(false);
          }}
        />
      </Modal>

      <Modal
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Edit User"
        size="md"
      >
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onUpdate={async (data) => {
              await updateUser(selectedUser.id, data);
              setSelectedUser(null);
            }}
            onPasswordChange={async (data) => {
              await changePassword(selectedUser.id, data);
              setSelectedUser(null);
            }}
            onStatusChange={async (status) => {
              await changeStatus(selectedUser.id, {
                is_active: status,
              });

              setSelectedUser(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
}
