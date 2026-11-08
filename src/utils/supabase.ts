// Optional Supabase integration for RSVP submissions.
// If VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are present in .env,
// submissions will automatically be posted to Supabase.

export interface RsvpRecord {
  id: string;
  fullName: string;
  mobile: string;
  guestCount: number;
  attendance: 'attending' | 'declining';
  message?: string;
  submittedAt: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export async function submitRsvpToDatabase(record: RsvpRecord): Promise<boolean> {
  // Always save locally in localStorage as reliable offline backup
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    existing.push(record);
    localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
  } catch (err) {
    console.warn('LocalStorage save failed:', err);
  }

  // If Supabase credentials are configured, post via REST API
  if (isSupabaseConfigured) {
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rsvps`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          id: record.id,
          full_name: record.fullName,
          mobile: record.mobile,
          guest_count: record.guestCount,
          attendance: record.attendance,
          message: record.message || '',
          created_at: record.submittedAt,
        }),
      });

      if (!response.ok) {
        console.warn('Supabase request returned status:', response.status);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Supabase post failed, saved to local cache:', err);
      return false;
    }
  }

  return true;
}

