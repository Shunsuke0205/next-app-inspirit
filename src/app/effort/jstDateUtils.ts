/**
 * Helper function to calculate the "activity date" based on JST 4:00 AM cut-off.
 * This must match the logic in the database trigger (set_jst_committed_date).
 */
export function getJstCommitDate(): string {
  const now = new Date();
  const jstTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const shiftedTime = new Date(jstTime);
  // Subtract 4 hours to shift the cut-off time to 4 AM JST (19:00 UTC previous day)
  shiftedTime.setHours(jstTime.getHours() - 4);
  
  // Format as "YYYY-MM-DD"
  return shiftedTime.toISOString().substring(0, 10);
};
