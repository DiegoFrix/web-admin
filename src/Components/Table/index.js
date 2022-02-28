import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { visuallyHidden } from '@mui/utils';
import { Button, IconButton } from '@mui/material';

import EditIcon from '../../assets/icons/edit';
import DeleteIcon from '../../assets/icons/delete';
import ViewIcon from '../../assets/icons/view';

function createData(name, area, email, status, details) {
    return {
        name,
        area,
        email,
        status,
    };
}

const rows = [
    createData('Diego Luna', 'Software', 'diego.lun18@gmail.com', 'Activo'),
    createData('Carlos Gomez', 'Back-end', 'Carlos@gmail.com', 'Inactivo'),
    createData('Miguel Jaramillo', 'Operaciones', 'Miguel@gmail.com', 'Activo'),
    createData('Alejandra García', 'Recursos Humanos', 'Alejandra18@gmail.com', 'Activo'),
    createData('Ruby Jimenez', 'Administración', 'Ruby@gmail.com', 'Activo'),
    createData('Daniel Sotelo', 'Soporte', 'Daniel@gmail.com', 'Inactivo'),
    createData('Aldair Leyva', 'Front-end', 'Aldair@gmail.com', 'Activo'),
    createData('Cesar Vazquez', 'Innovación', 'Cesar@gmail.com', 'Inactivo'),
    createData('Yaneth Castañeda', 'Testing', 'Yaneth@gmail.com', 'Activo'),
    createData('Adriana Bugarín', 'Testing', 'Adriana@gmail.com', 'Inactivo'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Administradores',
    },
    {
        id: 'area',
        numeric: false,
        disablePadding: false,
        label: 'Área',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Correo',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'Estatus',
    },
    {
        id: 'details',
        numeric: false,
        disablePadding: false,
        label: 'Detalles',
    },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


export default function CustomTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClick(event, row.name)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                <Grid container spacing={1}>
                                                    <Grid item xs={3}>
                                                        <Avatar alt={row.name} src="/static/images/avatar/example.jpg" />
                                                    </Grid>
                                                    <Grid item xs={9} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        {row.name}
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="left">{row.area}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">
                                                <Button
                                                    style={
                                                        row.status === 'Activo' ?
                                                            { backgroundColor: '#E8F5E9', color: '#4CAF50' } :
                                                            { backgroundColor: '#FFE1E0', color: '#EB5757' }
                                                    }
                                                >
                                                    {row.status}
                                                </Button>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton>
                                                    <ViewIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}