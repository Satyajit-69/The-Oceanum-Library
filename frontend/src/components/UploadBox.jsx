export default function UploadBox() {
  return (
    <div className="border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
      <input type="file" multiple />
    </div>
  );
}
