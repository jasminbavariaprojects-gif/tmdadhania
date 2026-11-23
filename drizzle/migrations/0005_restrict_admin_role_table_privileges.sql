revoke all on public.user_roles from PUBLIC, anon, authenticated;
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;