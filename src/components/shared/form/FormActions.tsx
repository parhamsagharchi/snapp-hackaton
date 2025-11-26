interface FormActionsProps {
  isEditing: boolean;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
}

/**
 * Reusable form actions component following Single Responsibility Principle
 */
export const FormActions = ({
  isEditing,
  onCancel,
  submitLabel,
  cancelLabel = "انصراف",
}: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <button
        type="submit"
        className="rounded-lg bg-primary px-4 py-1.5 text-sm font-medium text-white transition hover:bg-primary/90"
      >
        {submitLabel || (isEditing ? "ویرایش" : "افزودن")}
      </button>
      {isEditing && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-600 px-4 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700/50"
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
};

