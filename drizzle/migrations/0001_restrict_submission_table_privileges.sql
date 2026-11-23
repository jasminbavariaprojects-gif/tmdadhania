REVOKE ALL ON public.enquiry_submissions FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.booking_requests FROM PUBLIC, anon, authenticated;
GRANT ALL ON public.enquiry_submissions TO service_role;
GRANT ALL ON public.booking_requests TO service_role;