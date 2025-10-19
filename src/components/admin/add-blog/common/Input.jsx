export default function Input({ label, error, required = false, ...props }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`form-input ${error ? "border-red-500" : "border-gray-300"}`}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
