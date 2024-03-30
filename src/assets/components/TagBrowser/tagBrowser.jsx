import { useState } from "react";
import { useQuery } from "react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
  Typography,
  Pagination,
  Box,
} from "@mui/material";

const fetchTags = async (page, pageSize, sortBy, sortOrder) => {
  const response = await fetch(
    `https://api.stackexchange.com/2.3/tags?pagesize=${pageSize}&page=${page}&order=${sortOrder}&sort=${sortBy}&site=stackoverflow`
  );
  if (!response.ok) {
    throw new Error("There was a problem downloading the data!");
  }
  return response.json();
};

const TagBrowser = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState("popular");
  const [sortOrder, setSortOrder] = useState("desc");

  const { isLoading, isError, data, error } = useQuery(
    ["tags", page, pageSize, sortBy, sortOrder],
    () => fetchTags(page, pageSize, sortBy, sortOrder)
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
  };

  const handleChangeSortBy = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handleChangeSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Typography
        variant="body1"
        sx={{
          backgroundColor: "red",
          border: "1px solid black",
          padding: "20px",
          color: "white",
        }}
      >
        {error.message}
      </Typography>
    );

  return (
    <div>
      <TextField
        label="Items per page"
        type="number"
        value={pageSize}
        onChange={handleChangePageSize}
      />
      <TextField
        select
        label="Sort by"
        value={sortBy}
        onChange={handleChangeSortBy}
        SelectProps={{
          native: true,
        }}
      >
        <option value="popular">Most Popular</option>
        <option value="name">Name</option>
      </TextField>
      <TextField
        select
        label="Sort order"
        value={sortOrder}
        onChange={handleChangeSortOrder}
        SelectProps={{
          native: true,
        }}
      >
        <option value="desc">Descending</option>
        <option value="asc">Ascending</option>
      </TextField>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.items.map((tag) => (
              <TableRow key={tag.name}>
                <TableCell>{tag.name}</TableCell>
                <TableCell>{tag.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body1">Page: {page}</Typography>
      <Box display="flex" justifyContent="center" width="100%">
        <Pagination
          count={Math.ceil(data.total / pageSize)}
          page={page}
          onChange={handleChangePage}
          variant="outlined"
          shape="rounded"
        />
      </Box>
      <Typography variant="body1">Total Items: {data.items.length}</Typography>
    </div>
  );
};

export default TagBrowser;
