create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);

grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

grant execute on function public.has_role(uuid, public.app_role) to authenticated;

alter table public.enquiry_submissions add column if not exists admin_notes text;
alter table public.booking_requests add column if not exists admin_notes text;

alter table public.enquiry_submissions drop constraint if exists enquiry_submissions_status_check;
alter table public.enquiry_submissions add constraint enquiry_submissions_status_check check (status in ('new','contacted','scheduled','closed'));

alter table public.booking_requests drop constraint if exists booking_requests_status_check;
alter table public.booking_requests add constraint booking_requests_status_check check (status in ('new','contacted','scheduled','closed'));

grant select, update on public.enquiry_submissions to authenticated;
grant select, update on public.booking_requests to authenticated;

create policy "Admins can read enquiries" on public.enquiry_submissions
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update enquiries" on public.enquiry_submissions
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

create policy "Admins can read bookings" on public.booking_requests
  for select to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update bookings" on public.booking_requests
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));