import { useAuth } from '@/providers/AuthProvider';
import { Role } from '@/shared/types/roles';

// Simple RBAC rules based on the implementation plan
const permissions = {
  members: { read: [Role.ADMIN, Role.MANAGER, Role.USER], write: [Role.ADMIN, Role.MANAGER] },
  programs: { read: [Role.ADMIN, Role.MANAGER, Role.USER], write: [Role.ADMIN, Role.MANAGER] },
  homestays: { read: [Role.ADMIN, Role.MANAGER], write: [Role.ADMIN] },
  bookings: { read: [Role.ADMIN, Role.MANAGER], write: [Role.ADMIN] },
  events: { read: [Role.ADMIN, Role.MANAGER, Role.USER], write: [Role.ADMIN, Role.MANAGER] },
  donations: { read: [Role.ADMIN, Role.MANAGER], write: [Role.ADMIN] },
  partners: { read: [Role.ADMIN, Role.MANAGER], write: [Role.ADMIN, Role.MANAGER] },
  analytics: { read: [Role.ADMIN, Role.MANAGER], write: [Role.ADMIN] },
  settings: { read: [Role.ADMIN], write: [Role.ADMIN] }
};

type Resource = keyof typeof permissions;
type Action = 'read' | 'write';

export function usePermissions() {
  const { role, isLoading } = useAuth();

  const can = (action: Action, resource: Resource) => {
    if (!role) return false;
    return permissions[resource][action].includes(role);
  };

  return { can, isLoading, role };
}
