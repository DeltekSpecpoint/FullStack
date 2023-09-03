import React, {useEffect, useState} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';


export default function PaginationButtons({contacts}) {
    const pageSize = 12; // Number of cards to display per page
    const [currentPage, setCurrentPage] = useState(1);
    
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
      };
      
  return (
    <Stack spacing={2}>
      <Pagination count={Math.ceil(contacts.length / pageSize)}
                    page={currentPage}
                    onChange={handlePageChange}
                    showFirstButton showLastButton/>
    </Stack>
  );
}
