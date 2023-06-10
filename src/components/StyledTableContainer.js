import { Paper, Table, TableContainer } from '@mui/material'
import React from 'react'

function StyledTableContainer({ children, height, size }) {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', height: height ? height : "85%" }} elevation={0}>
            <TableContainer sx={{ maxHeight: "100%" }} >
                <Table stickyHeader aria-label="sticky table" size={size || "small"}>
                    {children}
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default StyledTableContainer