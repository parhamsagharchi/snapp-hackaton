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
    <div className="flex justify-end gap-1.5">
      <button
        type="submit"
        className="rounded-md bg-primary px-3 py-1 text-xs font-normal text-white transition hover:bg-primary/90"
      >
        {submitLabel || (isEditing ? "ویرایش" : "افزودن")}
      </button>
      {isEditing && onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-600 px-3 py-1 text-xs font-normal text-slate-300 transition hover:bg-slate-700/50"
        >
          {cancelLabel}
        </button>
      )}
    </div>
  );
};

