export default async function DatasetDetailPage({
  params,
}: {
  params: { datasetId: string };
}) {
  return <div>{params.datasetId}</div>;
}
