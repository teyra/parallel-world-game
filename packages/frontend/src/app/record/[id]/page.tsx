const RecordDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>My Record: {id}</div>;
};

export default RecordDetailPage;
