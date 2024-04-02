const TextInput = ({label,placeholder,className,value,setValue,labelClassname}) =>{
    return (
      <div className={`TextInputDiv flex flex-col space-y-2 w-full ${className}`}>
        <label for={label} className={`font-bold ${labelClassname}`}>
          {label}
        </label>
             <input id={label} type="text" placeholder={placeholder} className="p-3 border border-grey-600 border-solid rounded"
             value={value}
             onChange={(e)=>{
              setValue(e.target.value);
             }}
             />
      </div>
    );
}

export default TextInput;