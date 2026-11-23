create or replace function public.is_approved_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from auth.users u
    join public.user_roles r on r.user_id = u.id
    where u.id = _user_id
      and r.role = 'admin'
      and lower(u.email) = 'jasmin.bavria.projects@gmail.com'
  )
$$;

revoke all on function public.is_approved_admin(uuid) from PUBLIC;
grant execute on function public.is_approved_admin(uuid) to authenticated;
grant execute on function public.is_approved_admin(uuid) to service_role;

drop policy if exists "Admins can read enquiries" on public.enquiry_submissions;
create policy "Approved admin can read enquiries" on public.enquiry_submissions
  for select to authenticated using (public.is_approved_admin(auth.uid()));

drop policy if exists "Admins can update enquiries" on public.enquiry_submissions;
create policy "Approved admin can update enquiries" on public.enquiry_submissions
  for update to authenticated
  using (public.is_approved_admin(auth.uid()))
  with check (public.is_approved_admin(auth.uid()));

drop policy if exists "Admins can read bookings" on public.booking_requests;
create policy "Approved admin can read bookings" on public.booking_requests
  for select to authenticated using (public.is_approved_admin(auth.uid()));

drop policy if exists "Admins can update bookings" on public.booking_requests;
create policy "Approved admin can update bookings" on public.booking_requests
  for update to authenticated
  using (public.is_approved_admin(auth.uid()))
  with check (public.is_approved_admin(auth.uid()));