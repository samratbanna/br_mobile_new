import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {apiClient, URIS} from './api';

export interface Organization {
  name: string;
  slug: string;
  logo?: string;
  plan?: string;
  planExpiresAt?: string;
  isActive?: boolean;
  settings?: any;
  [key: string]: any;
}

// Plain async fetcher — used inside the session provider where hooks can't
// be called conditionally (e.g. after login / on silent boot login).
export const fetchMyOrganization = async (): Promise<Organization> => {
  const res: any = await apiClient.get(URIS.ORG_ME);
  if (res.ok) {
    return res.data as Organization;
  }
  throw res.data;
};

// Disabled by default — the caller controls when to fetch (e.g. once the
// staff is logged in), so this doesn't fire before login.
export const useMyOrganization = (
  config?: Partial<
    UseQueryOptions<Organization, Error, Organization, [string]>
  >,
) => {
  return useQuery<Organization, Error, Organization, [string]>({
    queryKey: [URIS.ORG_ME],
    queryFn: fetchMyOrganization,
    retry: false,
    ...config,
    enabled: config?.enabled ?? false,
  });
};
