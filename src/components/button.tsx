type Props = {
  children: React.ReactNode
} & React.ComponentPropsWithoutRef<"button">;

export default function Button({ 
  children,
  ...props
}: Props) {
  return (
    <button 
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      {...props}
    >
      {children}
    </button>
  );
}