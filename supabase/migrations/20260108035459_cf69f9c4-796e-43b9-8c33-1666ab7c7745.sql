-- Create hazard_reports table
CREATE TABLE public.hazard_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hazard_type TEXT NOT NULL CHECK (hazard_type IN ('tsunami', 'storm_surge', 'high_waves', 'coastal_flooding', 'abnormal_tides', 'coastal_damage')),
  description TEXT NOT NULL,
  latitude NUMERIC NOT NULL CHECK (latitude >= -90 AND latitude <= 90),
  longitude NUMERIC NOT NULL CHECK (longitude >= -180 AND longitude <= 180),
  media_urls TEXT[] DEFAULT '{}',
  severity TEXT NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'unverified', 'false')),
  reported_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hazard_reports ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view hazard reports (public safety data)
CREATE POLICY "Anyone can view hazard reports"
ON public.hazard_reports
FOR SELECT
TO authenticated, anon
USING (true);

-- Authenticated users can create reports
CREATE POLICY "Authenticated users can create reports"
ON public.hazard_reports
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = reported_by);

-- Users can update their own reports
CREATE POLICY "Users can update their own reports"
ON public.hazard_reports
FOR UPDATE
TO authenticated
USING (auth.uid() = reported_by);

-- Officials can update any report (for verification)
CREATE POLICY "Officials can update any report"
ON public.hazard_reports
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'official'::app_role));

-- Add trigger for updated_at
CREATE TRIGGER update_hazard_reports_updated_at
BEFORE UPDATE ON public.hazard_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for hazard_reports table
ALTER PUBLICATION supabase_realtime ADD TABLE public.hazard_reports;