CREATE OR REPLACE FUNCTION public.is_approved_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM auth.users u
    JOIN public.user_roles r ON r.user_id = u.id
    WHERE u.id = _user_id
      AND r.role = 'admin'
      AND lower(u.email) = 'jasmin.bavaria.projects@gmail.com'
  );
$$;