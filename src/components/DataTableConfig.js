import React from 'react';
import Dropdown from './Dropdown';

const DataTableConfig = ({onClick,value, onChange}) => {
    const handleCheck = (event) => {
        onClick(event);
    }

    const onChangeValue = event => {
        onChange(event);
    }
    return (
        <div className="tableConfig">            
                <div className="leftDiv">                    
                    <input className="form-check-input" type="checkbox" 
                    value={value} id="flexCheckChecked" onClick={handleCheck}></input>
                    <label className="form-check-label">
                    Show Delete
                    </label>                    
                    </div>
                <div className="rightDiv">
                <Dropdown data={[{key:'empNo', value: 'Employee Number'}, 
                {key:'empName', value:'Employee Name'}, {key:'salary', value: 'Salary'}, 
                {key:'deptName', value:'Department Name'}, {key:'designation', value: 'Designation'}]} 
                    placeholder={'Sort By Column'} onChange={onChangeValue} name={'sort'}></Dropdown>                    
                </div>
        </div>
    )
}

export default DataTableConfig;
