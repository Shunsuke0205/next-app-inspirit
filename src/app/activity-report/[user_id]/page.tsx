

export default async function Page({
  params,
} : {
  params: Promise<{ user_id : string }>
}) {
  const { user_id } = await params;

  return (
    <div>
      Activity ID: {user_id}
    </div>
  );
}