"use client";

import { useState } from "react";

import {
  Modal,
  PageLoader,
  useDebounce,
  User,
  Button,
  Pagination,
  AdminPageHeader as PageHeader,
  ErrorFallback,
  EmptyState,
  Loader,
  NoResults,
} from "@/shared";
import { UserQuery } from "../../types";
import { DEFAULT_USER_QUERY } from "../../constants";
import useUsers from "../../hooks/useUsers";
import UserToolbar from "../UserToolbar/UserToolbar";
import UserTable from "../UserTable/UserTable";
import UserForm from "../UserForm/UserForm";
import { EditUserForm } from "../EditUserForm";
import { Plus, Users } from "lucide-react";

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
  const hasFilters = Boolean(query.search) || Boolean(query.role) || Boolean(query.status);

  const showEmptyState = pagination.total === 0 && !hasFilters;

  const showNoResults = pagination.total === 0 && hasFilters;

  if (error) {
    return (
      <ErrorFallback
        title="Unable to load users"
        message="We couldn't retrieve the user list right now. Please check your connection and try again."
        error={error}
        onRetry={refresh}
        retryLabel="Retry Loading"
      />
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-5 sm:space-y-6">
      <PageHeader
        title="User Management"
        subtitle="Manage administrators, lecturers, and student accounts."
        action={
          <Button
            type="button"
            size="lg"
            fullWidth
            className="sm:w-auto"
            onClick={() => setShowCreateUser(true)}
            leftIcon={<Plus size={18} />}
          >
            Add User
          </Button>
        }
      />
      <UserToolbar
        filters={query}
        onFiltersChange={(filters) =>
          setQuery({
            ...filters,
            page: 1,
          })
        }
      />

      {showEmptyState ? (
        <EmptyState
          icon={<Users size={28} />}
          title="No Users Available"
          message="Create user accounts for students, lecturers, and administrators."
          size="lg"
          action={{
            label: "Add User",
            icon: <Plus size={18} />,
            onClick: () => setShowCreateUser(true),
          }}
        />
      ) : showNoResults ? (
        <NoResults
          title="No users found"
          message="Try changing your search or filters."
          action={
            <Button size="sm" className="mt-6" onClick={() => setQuery(DEFAULT_USER_QUERY)}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <>
          <div className="relative">
            {isFetching && <Loader message="Loading users..." />}
            <UserTable users={users} onEdit={setSelectedUser} />
          </div>

          <Pagination
            label="users"
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
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

      <Modal open={showCreateUser} onClose={() => setShowCreateUser(false)} title="Create User" size="md">
        <UserForm
          onSubmit={async (data) => {
            await createUser(data);
            setShowCreateUser(false);
          }}
        />
      </Modal>

      <Modal open={!!selectedUser} onClose={() => setSelectedUser(null)} title="Edit User" size="md">
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
