"use client";

import { Plus, Users } from "lucide-react";
import { useState } from "react";

import {
  DEFAULT_USER_QUERY,
  EditUserForm,
  UserForm,
  UserTable,
  UserToolbar,
  useUserMutations,
  useUsers,
  type UserQuery,
} from "@/features/users";
import {
  Modal,
  PageLoader,
  useDebounce,
  User,
  Button,
  Pagination,
  PageHeader,
  ErrorFallback,
  EmptyState,
  Loader,
  NoResults,
  Section,
} from "@/shared";

export default function UserManagement() {
  const [query, setQuery] = useState<UserQuery>(DEFAULT_USER_QUERY);

  const [showCreateUser, setShowCreateUser] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const debouncedQuery = useDebounce(query, 400);
  const { users, pagination, loading, isFetching, error, refresh } = useUsers(debouncedQuery);
  const { createUser, updateUser, changePassword, changeStatus } = useUserMutations(refresh);

  if (loading && !error) {
    return <PageLoader />;
  }

  const hasResults = pagination.total > 0;
  const hasData = pagination.hasData;
  const showEmptyState = !isFetching && !hasData;
  const showNoResults = !isFetching && hasData && !hasResults;

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
    <>
      <PageHeader
        title="User Management"
        subtitle="Manage administrators, lecturers, and student accounts."
        action={
          hasData ? (
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
          ) : undefined
        }
      />

      <Section>
        {showEmptyState && (
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
        )}

        {hasData && (
          <>
            <UserToolbar
              filters={query}
              onFiltersChange={(filters) =>
                setQuery({
                  ...filters,
                  page: 1,
                })
              }
            />
            {isFetching && !hasResults && <Loader message="Loading users..." />}
            {showNoResults && (
              <NoResults
                title="No users found"
                message="Try changing your search or filters."
                action={{
                  label: "Clear Filters",
                  onClick: () => setQuery(DEFAULT_USER_QUERY),
                }}
              />
            )}

            {hasResults && (
              <>
                <div className="relative">
                  {isFetching && <Loader overlay message="Loading users..." />}
                  <UserTable users={users} onEdit={setSelectedUser} />
                </div>

                <Pagination
                  label="users"
                  page={pagination.page}
                  totalPages={pagination.totalPages}
                  total={pagination.total}
                  hasPrevious={pagination.page > 1}
                  hasNext={pagination.page < pagination.totalPages}
                  onPrevious={() =>
                    setQuery((previous) => ({
                      ...previous,
                      page: previous.page - 1,
                    }))
                  }
                  onNext={() =>
                    setQuery((previous) => ({
                      ...previous,
                      page: previous.page + 1,
                    }))
                  }
                />
              </>
            )}
          </>
        )}
      </Section>

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
                isActive: status,
              });
              setSelectedUser(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
