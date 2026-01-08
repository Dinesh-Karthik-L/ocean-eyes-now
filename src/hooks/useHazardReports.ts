import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { HazardReport, HazardType, SeverityLevel, VerificationStatus } from '@/types/hazard';

interface DbHazardReport {
  id: string;
  hazard_type: string;
  description: string;
  latitude: number;
  longitude: number;
  media_urls: string[];
  severity: string;
  verification_status: string;
  reported_by: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

const mapDbToHazardReport = (row: DbHazardReport): HazardReport => ({
  id: row.id,
  hazardType: row.hazard_type as HazardType,
  description: row.description,
  latitude: Number(row.latitude),
  longitude: Number(row.longitude),
  mediaUrls: row.media_urls || [],
  timestamp: new Date(row.created_at),
  reportedBy: row.reported_by || 'anonymous',
  verificationStatus: row.verification_status as VerificationStatus,
  severity: row.severity as SeverityLevel,
  language: row.language || 'en',
});

export const useHazardReports = () => {
  const [reports, setReports] = useState<HazardReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial reports
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('hazard_reports')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setReports((data || []).map(mapDbToHazardReport));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reports');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();

    // Set up realtime subscription
    const channel = supabase
      .channel('hazard-reports-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'hazard_reports',
        },
        (payload) => {
          const newReport = mapDbToHazardReport(payload.new as DbHazardReport);
          setReports((prev) => [newReport, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'hazard_reports',
        },
        (payload) => {
          const updatedReport = mapDbToHazardReport(payload.new as DbHazardReport);
          setReports((prev) =>
            prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'hazard_reports',
        },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setReports((prev) => prev.filter((r) => r.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { reports, isLoading, error };
};
