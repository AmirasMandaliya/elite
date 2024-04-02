const PasswordInput = ({label,placeholder,value,setValue}) =>{
    return (
      <div className="TextInputDiv flex flex-col space-y-2 w-full">
        <label for="123" className="font-bold">
          {label}
        </label>
             <input id={label} type="password" placeholder={placeholder} className="p-3 border border-grey-600 border-solid rounded" 
             value={value}
             onChange={(e)=>{
              setValue(e.target.value);
             }}
             />
      </div>
    );
}

export default PasswordInput;