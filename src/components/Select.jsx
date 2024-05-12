import React , {useId} from 'react'

function Select({
    label,
    options = [],
    classname ='',
    ...props
} , ref) {

    const id  = useId();

  return (
    <div>
        {label && ( <label htmlFor={id}></label> )}
        <select id={id} ref={ref} className={`${classname}`} {...props}>
            {options?.map((option)=>(
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)