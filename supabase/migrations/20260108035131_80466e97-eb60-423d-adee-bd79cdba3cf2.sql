-- Add base permissive policies requiring authentication for profiles table
-- These work WITH existing restrictive policies to ensure only authenticated users can access

CREATE POLICY "Authenticated users base access"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Add base permissive policy requiring authentication for user_roles table
CREATE POLICY "Authenticated users base access"
ON public.user_roles
FOR SELECT
TO authenticated
USING (true);