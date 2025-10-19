export default function TextArea({
  label,
  error,
  required = false,
  rows = 4,
  ...props
}) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={`form-input ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
