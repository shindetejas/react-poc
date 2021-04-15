import React, {Component, Fragment} from 'react';
import '../Form.css';
import Dropdown from './Dropdown';
import DataTableComponent from './DataTable';
import DataTableConfig from './DataTableConfig';
import { FormErrors } from './FormErrors';

class RootComponent extends Component {
    constructor() {
        super();        
        this.state = {
            empNo: '',
            empName: '',
            salary: '',
            deptName: '',
            designation: '',
            formErrors: {empNo: '', empName: '', salary: '', deptName: '', designation: ''},
            formValid: false,
            empNoValid : false,
            empNameValid : false,
            salaryValid: false,
            deptNameValid: false,
            designationValid: false,
            empList: [],
            columns : [{text : 'Employee Number',
                    key: 'empNo',
                    className: 'empNo',
                    align: 'center',
                    sortable: true}, 
                    {text : 'Employee Name',
                    key: 'empName',
                    className: 'empName',
                    align: 'center',
                    sortable: true},
                    {text : 'Salary',
                    key: 'salary',
                    className: 'salary',
                    align: 'center',
                    sortable: true}, 
                    {text : 'Department Name',
                    key: 'deptName',
                    className: 'deptName',
                    align: 'center',
                    sortable: true},
                    {
                    text : 'Designation',
                    key: 'designation',
                    className: 'designation',
                    align: 'center',
                    sortable: true}]
        }
    }
    onChangeValue = event => {        
        const {name, value}  = event.target;        
        this.setState({[name] : value}, () => {
            this.validateInput(event);
        });        
    }

    validateInput = (event) => {        
        let {formErrors, empNoValid, empNameValid, 
            salaryValid, deptNameValid, designationValid} = this.state;        
        let {name, value} = event.target;

        switch(name) {            
            case 'empNo':                 
                empNoValid = value.match(/^[1-9]+[0-9]*$/i);
                formErrors.empNo = empNoValid ? '' : 'Employee Number allows only numeric values';
                break;
            case 'salary' :
                salaryValid = value.match(/^[1-9]+[0-9]*$/i);
                formErrors.salary = salaryValid ? '' : 'Salary allows only numeric values';
                break;
            case 'empName' : 
                empNameValid =  value.match(/^[a-zA-Z ]*$/i);
                formErrors.empName = empNameValid ? '' : 'Employee name allows only alphabets';
                break;
            case 'deptName':
                deptNameValid = value.length > 0;
                formErrors.deptName = deptNameValid ? '' : 'Please Select Department';
                break;
            case 'designation':
                designationValid = value.length > 0;
                formErrors.designation = designationValid ? '' : 'Please Select Designation';
                break;
            default:
                break;
        }
                
        this.setState({formErrors : formErrors,empNoValid : empNoValid,empNameValid : empNameValid,salaryValid:salaryValid,
            deptNameValid : deptNameValid, designationValid : designationValid}, this.validateForm)
    }

    validateForm = () => {        
        this.setState({formValid: this.state.empNoValid && this.state.empNameValid &&
                        this.state.salaryValid && this.state.deptNameValid && this.state.designationValid});
    }
    
    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    handleSubmit = event => {                
        event.preventDefault();        
        let empList = [...this.state.empList];
        empList.push({
            empNo : this.state.empNo,
            empName:  this.state.empName,
            salary: this.state.salary,
            deptName: this.state.deptName,
            designation: this.state.designation
        });

        this.setState({
            empList,
            empNo: '',
            empName: '',
            salary: '',
            deptName: '',
            designation: '',
            formErrors: {empNo: '', empName: '', salary: '', deptName: '', designation: ''},
            formValid: false,
            empNoValid : false,
            empNameValid : false,
            salaryValid: false,
            deptNameValid: false,
            designationValid: false,
        }, () => {            
            event.target.reset();
        });        
    }

    deleteRecord = (record) => {        
        let empList = [...this.state.empList];
        let index = empList.findIndex(x => x.empName === record.empName);        
        empList.splice(index, 1);
        this.setState({
           empList: empList
        });
    }

    handleClick = event => {        
        let columns = [...this.state.columns];
        if(event.target.checked) {
            columns.push({
                key: "Delete",
                text: "Delete",
                className: "delete",
                width: 100, 
                align: 'center',                       
                sortable: false,
                cell: record => { 
                    return (
                    <Fragment>
                        <a href="#"><span class="glyphicon glyphicon-trash"
                        onClick={() => this.deleteRecord(record)}>                                
                    </span></a>                                    
                </Fragment>
            );}})
        }
        else {            
            let index = columns.findIndex(x => x.key === event.target.value);        
            columns.splice(index, 1);
        }

        this.setState({
             columns:columns   
        });
    }

    compareByAsc = key => {
        return function(a, b) {
          if (a[key] < b[key]) return -1;
          if (a[key] > b[key]) return 1;
          return 0;
        };
    }
    
    compareByDesc = key => {
        return function(a, b) {
          if (a[key] < b[key]) return 1;
          if (a[key] > b[key]) return -1;
          return 0;
        };
    }

    handleSort = event => {        
        let empList = [...this.state.empList];
        const arrInStr = JSON.stringify(empList);
        let {value} = event.target;        
        empList.sort(this.compareByAsc(value));
        const arrInStr1 = JSON.stringify(empList);
        if (arrInStr === arrInStr1) {
            empList.sort(this.compareByDesc(value));
        }

        this.setState({
            empList:empList
        });        
    }

    render() {
        return (
            <div>            
            <form className='demoForm' onSubmit={this.handleSubmit}>
                <h2>Registration</h2>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.empNo)}`}>
                    <input type='text' className='form-control' name='empNo' 
                    required placeholder='Employee Number' onChange={this.onChangeValue}></input>                   
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.empName)}`}>
                    <input type='text' className='form-control' name='empName' 
                    required placeholder='Employee Name' onChange={this.onChangeValue}></input>                
                </div>
                <div className={`form-group ${this.errorClass(this.state.formErrors.salary)}`}>
                    <input type='text' className='form-control' name='salary' 
                    required placeholder='Salary' onChange={this.onChangeValue}></input>                    
                </div>                
                <Dropdown data={[{key: 'IT', value: 'IT'},{key: 'HR', value: 'HR'},
                {key: 'Finance', value: 'Finance'},{key:'Marketing', value:'Marketing'}]} 
                    placeholder={'Select Department'} onChange={this.onChangeValue} name={'deptName'}></Dropdown>                    
                <Dropdown data={[{key: 'Manager', value: 'Manager'}, {key:'Developer', value: 'Developer'},
                {key:'Sr.Manager', value: 'Sr.Manager'}, {key: 'CTO', value: 'CTO'}]} 
                    placeholder={'Select Designation'} onChange={this.onChangeValue} name={'designation'}></Dropdown>                    
                <button type='submit' className='btn btn-primary' 
                disabled={!this.state.formValid}>Submit</button>
            </form>
            <br/>
            <br/>
            <DataTableConfig onClick={this.handleClick} value={'Delete'} onChange={this.handleSort}></DataTableConfig>
            <br/>
            <DataTableComponent items={this.state.empList} 
            config={{'page_size': 5, 'length_menu': [5,10,15], 'show_filter': false}}
            cols={this.state.columns}></DataTableComponent>
            </div>
        )
    } 
}

export default RootComponent

