-- 0. ADMIN WHITELIST INFRASTRUCTURE
-- Table to store authorized admin emails
CREATE TABLE IF NOT EXISTS "admin_whitelist" (
  "email" text PRIMARY KEY,
  "created_at" timestamp with time zone DEFAULT now()
);

-- Enable RLS on whitelist (only admins or service role can see it)
ALTER TABLE "admin_whitelist" ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role or whitelisted emails can view the whitelist
-- Actually, we can just leave it to service role for now or allow admins to see it.
DROP POLICY IF EXISTS "Admins can view whitelist" ON "admin_whitelist";
CREATE POLICY "Admins can view whitelist" 
ON "admin_whitelist" FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM "admin_whitelist" aw 
    WHERE aw.email = auth.jwt() ->> 'email'
  )
);

-- Helper function to check if an email is whitelisted
CREATE OR REPLACE FUNCTION public.is_admin_email(email_to_check text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_whitelist
    WHERE email = email_to_check
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 1. SECURE "references" TABLE
-- Enable RLS
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view references
DROP POLICY IF EXISTS "Public can view references" ON "references";
CREATE POLICY "Public can view references" 
ON "references" FOR SELECT 
USING (true);

-- Policy: Only whitelisted admins can manage references
DROP POLICY IF EXISTS "Authenticated users can manage references" ON "references";
CREATE POLICY "Whitelisted admins can manage references" 
ON "references" FOR ALL 
USING (public.is_admin_email(auth.jwt() ->> 'email'))
WITH CHECK (public.is_admin_email(auth.jwt() ->> 'email'));


-- 2. SECURE "project-documents" STORAGE BUCKET
-- Ensure bucket is private (can be done in UI or via SQL)
-- Note: Setting a bucket to private means getPublicUrl won't work.
-- Note: RLS protects the objects in the bucket.

-- Policy: Storage upload is now handled via API using service_role. 
-- Public upload policy is REMOVED to prevent DoS/unauthorized storage usage.
DROP POLICY IF EXISTS "Public can upload documents" ON storage.objects;

-- Policy: Only whitelisted admins can view/download
DROP POLICY IF EXISTS "Authenticated users can select documents" ON storage.objects;
CREATE POLICY "Whitelisted admins can select documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'project-documents' AND
  public.is_admin_email(auth.jwt() ->> 'email')
);

-- Policy: Only whitelisted admins can delete documents
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;
CREATE POLICY "Whitelisted admins can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-documents' AND
  public.is_admin_email(auth.jwt() ->> 'email')
);


-- 3. INQUIRIES LOGGING TABLE
-- This table stores contact form submissions as a backup.
CREATE TABLE IF NOT EXISTS "inquiries" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT now(),
  "name" text,
  "email" text,
  "phone" text,
  "message" text,
  "property" text,
  "area" text,
  "features" text,
  "tech_supply" boolean,
  "tech_supply_details" text,
  "distribution_board" boolean,
  "electrical_install" boolean,
  "file_paths" text[],
  "ai_history" text
);

-- RLS for inquiries: Service role can do everything, but let's restrict public
ALTER TABLE "inquiries" ENABLE ROW LEVEL SECURITY;

-- Policy: Only whitelisted admins can see inquiries
DROP POLICY IF EXISTS "Admins can view inquiries" ON "inquiries";
CREATE POLICY "Whitelisted admins can view inquiries"
ON "inquiries" FOR SELECT
USING (public.is_admin_email(auth.jwt() ->> 'email'));
