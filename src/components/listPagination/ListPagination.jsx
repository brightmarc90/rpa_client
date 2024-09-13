/* eslint-disable react/prop-types */
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";

const ListPagination = ({count, limit, changePage}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limit);
  const totalPages = Math.ceil(count / rowsPerPage);

  const handleChangePage = (event, newPage) => {
    changePage(rowsPerPage*newPage, rowsPerPage) // prev ou next
    console.log(page, newPage)
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const temp = parseInt(event.target.value, 10)
    changePage(0, temp)
    setPage(0)
    setRowsPerPage(temp);
  };

  useEffect(() => {
    if (page >= totalPages && totalPages > 0) {
        setPage(0);
      }
  }, [totalPages, page])
  
  return (
    <div>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ListPagination;
