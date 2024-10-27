type Props = {
    Label?: string;
  } & React.InputHTMLAttributes<HTMLInputElement>;


export default function Input({Label,...rest} : Props) {
  return (
    <label className="block">
        <span className="block text-sm font-bold text-slate-700">{Label}</span>
        <div className="relative rounded-md shadow-sm">
            <input
              {...rest} 
              className="rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
        </div>
    </label>
  );
}
