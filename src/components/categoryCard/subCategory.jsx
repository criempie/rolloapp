const SubCategory = (props) => {
	const { label, inputName, id } = props

	return (
		<li
			className="flex gap-3 hover:text-purple-500 px-4 py-3 hover:bg-purple-200 text-slate-50 bg-slate-700/50 rounded-lg items-center">
			<input type="checkbox"
						 name={inputName}
						 value={id}
						 className="appearance-none form-check-input align-top bg-no-repeat bg-center bg-contain float-left h-6 w-6 checked:bg-purple-500 border-2 border-purple-400 rounded-md" />
			<label>
				{label}
			</label>
		</li>
	)
}

export default SubCategory