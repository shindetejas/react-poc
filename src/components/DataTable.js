import React from 'react';
import PropTypes from 'prop-types';
import ReactDatatable from '@ashvin27/react-datatable';

const DataTableComponent = ({cols, items, config}) => {
        return (
            <div className='demoTable'>
                <ReactDatatable       
                    columns={cols}
                    records={items}
                    config={config}
                />
            </div>
        )
}    

DataTableComponent.propTypes = {
    cols: PropTypes.array.isRequired,
    items: PropTypes.array.isRequired
}

export default DataTableComponent