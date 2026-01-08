-- Create storage bucket for hazard media
INSERT INTO storage.buckets (id, name, public)
VALUES ('hazard-media', 'hazard-media', true);

-- Create storage policies for hazard media
CREATE POLICY "Anyone can view hazard media"
ON storage.objects FOR SELECT
USING (bucket_id = 'hazard-media');

CREATE POLICY "Authenticated users can upload hazard media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hazard-media' AND auth.role() = 'authenticated');

CREATE POLICY "Users can delete their own uploads"
ON storage.objects FOR DELETE
USING (bucket_id = 'hazard-media' AND auth.uid()::text = (storage.foldername(name))[1]);