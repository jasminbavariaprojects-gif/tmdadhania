revoke all on function public.has_role(uuid, public.app_role) from PUBLIC, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
grant execute on function public.has_role(uuid, public.app_role) to service_role;

revoke all on function public.is_approved_admin(uuid) from PUBLIC, anon;
grant execute on function public.is_approved_admin(uuid) to authenticated;
grant execute on function public.is_approved_admin(uuid) to service_role;