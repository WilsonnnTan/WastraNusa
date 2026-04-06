type AuthDividerProps = {
  label?: string;
};

export function AuthDivider({ label = 'or sign up with' }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="h-px flex-1 bg-[#c8bfb0]" />
      <span className="text-xs text-[#9a8e80]">{label}</span>
      <div className="h-px flex-1 bg-[#c8bfb0]" />
    </div>
  );
}
