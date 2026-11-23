CREATE TABLE public.enquiry_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT enquiry_submissions_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  CONSTRAINT enquiry_submissions_phone_length CHECK (char_length(phone) BETWEEN 10 AND 15),
  CONSTRAINT enquiry_submissions_email_length CHECK (char_length(email) <= 255),
  CONSTRAINT enquiry_submissions_service_length CHECK (char_length(service) BETWEEN 1 AND 100),
  CONSTRAINT enquiry_submissions_message_length CHECK (message IS NULL OR char_length(message) <= 1000),
  CONSTRAINT enquiry_submissions_status_valid CHECK (status IN ('new', 'contacted', 'closed'))
);

GRANT ALL ON public.enquiry_submissions TO service_role;

ALTER TABLE public.enquiry_submissions ENABLE ROW LEVEL SECURITY;

CREATE INDEX enquiry_submissions_created_at_idx ON public.enquiry_submissions (created_at DESC);

CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  preferred_date date,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT booking_requests_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  CONSTRAINT booking_requests_phone_length CHECK (char_length(phone) BETWEEN 10 AND 15),
  CONSTRAINT booking_requests_email_length CHECK (char_length(email) <= 255),
  CONSTRAINT booking_requests_service_length CHECK (char_length(service) BETWEEN 1 AND 100),
  CONSTRAINT booking_requests_message_length CHECK (message IS NULL OR char_length(message) <= 1000),
  CONSTRAINT booking_requests_status_valid CHECK (status IN ('new', 'contacted', 'closed'))
);

GRANT ALL ON public.booking_requests TO service_role;

ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX booking_requests_created_at_idx ON public.booking_requests (created_at DESC);