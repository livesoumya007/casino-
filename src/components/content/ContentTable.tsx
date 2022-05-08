import { Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from '@mui/material';
import React, { useState } from 'react'
import { Istate as Props } from './Content'
import img0 from '../../images/img0.jpg'
import img1 from '../../images/img1.jpg'
import img2 from '../../images/img2.jpg'
import img3 from '../../images/img3.jpg'


const ContentTable: React.FC<Props> = ({ datas }) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState<string>('');
    const renderData = () => {
        if(datas.length === 0){
            return <p style={{ display: 'flex', justifyContent: 'right'}}> No data availabl. Please click on the start game  </p>
        }
        return dataAfterPaginationAndSorting().map((data: any) => {
            return <TableRow key={data.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                    {data.id}
                </TableCell>
                <TableCell align="center">
                    {data.slot.map((d: number) => {
                        return <span style={{ marginLeft: '0.7rem' }}> <img height={'28rem'} alt={`${d}`} src={d === 0 ? img0 : (d === 1 ? img1 : (d === 2 ? img2 : img3))} /> </span>
                    })}
                </TableCell>
                <TableCell component="th" scope="row">
                    {data.time}
                </TableCell>
            </TableRow>
        })
    }

    const handleSortRequest = (colName: string) => {
        let isAsc = colName === orderBy && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(colName);
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null, newPage: number) => {
        setPage(newPage);
    };

    const dataAfterPaginationAndSorting = () => {
        return stableSort(datas, getComparator(order, orderBy)).slice(page*rowsPerPage, (page+1)*rowsPerPage);
    }

    function stableSort(array: any , comparator: any) {
        const stabilizedThis = array.map((el: any, index: number) => [el, index]);
        stabilizedThis.sort((a: any, b: any) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el: any) => el[0]);
    }

    function getComparator(order: string, orderBy: string) {
        return order === 'desc'
            ? (a: any, b: any) => descendingComparator(a, b, orderBy)
            : (a: any, b: any) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a: any, b: any, orderBy: string) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    return <>
        <TableContainer  sx={{  maxHeight: '470px' }} >
            <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <TableSortLabel active={orderBy === 'id'} 
                                    onClick={() => { handleSortRequest('id') }} >Id</TableSortLabel>
                    </TableCell>
                    <TableCell sx={{ width: '25rem' }} size='medium' align="center">Slot</TableCell>
                    <TableCell align="left"> <TableSortLabel active={orderBy === 'id'} 
                                    onClick={() => { handleSortRequest('id') }} >Time</TableSortLabel></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {renderData()}
            </TableBody>
            {
                datas.length > 0 && <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[]}
                            count={datas.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                        />
                    </TableRow>
                </TableFooter>
            }
            </Table>
        </TableContainer>        
    </>



}

export default ContentTable;
