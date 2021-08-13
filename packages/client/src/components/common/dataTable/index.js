import PropTypes from 'prop-types';
import { Table, TableRow, TableBody, TableHead, TableCell, TablePagination } from '@material-ui/core';
import _ from 'lodash';
import clsx from 'clsx';
import { Scrollbars } from 'react-custom-scrollbars';

const DataTableComponent = ({ className, columns, items, pagination, isLoading, action }) => {
  const renderTableHead = () => {
    if (!_.isArray(columns)) {
      return null;
    }

    return columns.map((value, index) => (
      <TableCell width={value.width} key={index} className="px-2">
        {value.label}
      </TableCell>
    ));
  };

  const renderTableCellData = (rowObject) => {
    if (!_.isArray(columns)) {
      return null;
    }
    return columns.map((value, index) => {
      if (_.isFunction(value.cell)) {
        return (
          <TableCell className="overflow-hidden py-1 px-2" key={index} width={value.width}>
            {value.cell({ ...rowObject, ...(action || {}) })}
          </TableCell>
        );
      }

      const valueCell = _.get(rowObject, value.key);

      return (
        <TableCell className="overflow-hidden p-0  px-2" width={value.width} key={index}>
          {valueCell}
        </TableCell>
      );
    });
  };

  const renderTableRowData = () => {
    if (!_.isArray(items)) {
      return null;
    }

    return items.map((value, index) => {
      if (index >= pagination?.rowsPerPage) {
        return;
      }
      return <TableRow key={index}>{renderTableCellData(value)}</TableRow>;
    });
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      <Scrollbars className="flex-1 flex">
        <Table className={clsx('h-full w-full relative table-fixed', className)}>
          <TableHead>
            <TableRow>{renderTableHead()}</TableRow>
          </TableHead>
          <TableBody>{renderTableRowData()}</TableBody>
        </Table>
      </Scrollbars>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={pagination.rowsPerPageOptions || [10, 50, 100]}
          component="div"
          count={pagination.total}
          rowsPerPage={pagination.rowsPerPage}
          page={pagination.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={pagination.handleChangePage}
          onChangeRowsPerPage={pagination.handleChangeRowsPerPage}
        />
      )}
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center backdrop-loading">
          <div className="loading" />
        </div>
      )}
    </div>
  );
};

DataTableComponent.propTypes = {
  className: PropTypes.any,
  columns: PropTypes.any,
  items: PropTypes.any,
  pagination: PropTypes?.any,
  isLoading: PropTypes?.any,
};

export default DataTableComponent;
