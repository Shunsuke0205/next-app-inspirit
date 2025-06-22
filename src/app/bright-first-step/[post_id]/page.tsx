

export default async function Page({
  params,
} : {
  params: Promise<{ post_id: string }>
}) {
  const { post_id } = await params;

  return (
    <div>
      Bright First Step Post ID: {post_id}
    </div>
  );
}