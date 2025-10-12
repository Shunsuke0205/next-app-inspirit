/**
 * Helper function to calculate the "activity date" based on JST 4:00 AM cut-off.
 * This must match the logic in the database trigger (set_jst_committed_date).
 */
export function getJstCommitDate(): string {
  const JST_OFFSET_HOURS = 9; // JST is UTC+9
  const COMMIT_SHIFT_HOURS = 4; // Shift cut-off to 4 AM
  const now = new Date();
  const nowUtcHours = now.getUTCHours();
  const shiftedTime = now.setUTCHours(nowUtcHours + JST_OFFSET_HOURS - COMMIT_SHIFT_HOURS);

  // Format as "YYYY-MM-DD"
  const formattedDate = new Date(shiftedTime).toISOString().substring(0, 10);
  return formattedDate;
}
