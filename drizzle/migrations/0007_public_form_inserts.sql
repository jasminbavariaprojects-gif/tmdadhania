GRANT INSERT ON public.enquiry_submissions TO anon;
GRANT INSERT ON public.booking_requests TO anon;
CREATE POLICY "Visitors can submit enquiries" ON public.enquiry_submissions
  FOR INSERT TO anon WITH CHECK (status = 'new' AND admin_notes IS NULL);
CREATE POLICY "Visitors can submit bookings" ON public.booking_requests
  FOR INSERT TO anon WITH CHECK (status = 'new' AND admin_notes IS NULL);