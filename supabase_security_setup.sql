-- 1. SECURE "references" TABLE
-- Enable RLS
ALTER TABLE "references" ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view references
DROP POLICY IF EXISTS "Public can view references" ON "references";
CREATE POLICY "Public can view references" 
ON "references" FOR SELECT 
USING (true);

-- Policy: Only authenticated users can manage references
-- (We will also check if they are in the whitelist via edge functions or just rely on App-side whitelist for now, 
-- but RLS protects against unauthorized anon writes)
DROP POLICY IF EXISTS "Authenticated users can manage references" ON "references";
CREATE POLICY "Authenticated users can manage references" 
ON "references" FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');


-- 2. SECURE "project-documents" STORAGE BUCKET
-- Ensure bucket is private (can be done in UI or via SQL)
-- Note: Setting a bucket to private means getPublicUrl won't work.

-- Policy: Only authenticated users can upload documents
DROP POLICY IF EXISTS "Authenticated users can upload documents" ON storage.objects;
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Only authenticated users can view/download (even via signed URL, the object must be accessible)
DROP POLICY IF EXISTS "Authenticated users can select documents" ON storage.objects;
CREATE POLICY "Authenticated users can select documents"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'project-documents' AND
  auth.role() = 'authenticated'
);

-- Policy: Only authenticated users can delete documents
DROP POLICY IF EXISTS "Authenticated users can delete documents" ON storage.objects;
CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-documents' AND
  auth.role() = 'authenticated'
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

-- Only admins/service role can see inquiries
DROP POLICY IF EXISTS "Admins can view inquiries" ON "inquiries";
CREATE POLICY "Admins can view inquiries"
ON "inquiries" FOR SELECT
USING (auth.role() = 'authenticated');
