import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { GetQuote, GetSearchQuote } from "../api/QuoteAPI";
import QuoteItem from "../components/QuoteItem";

const Quotes = () => {
  const [quoterows, setrows] = useState(20);
  const [page, setPage] = useState(1);

  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: () => GetQuote(1, 20),
  });

  const { mutateAsync: GetQuoteWithPageNo } = useMutation({
    mutationKey: ["quote"],
    mutationFn: GetQuote,
    onSuccess: (data) => {
      queryClient.setQueryData(["quote"], data);
    },
  });

  const { mutateAsync: GetQuoteWithSearch } = useMutation({
    mutationKey: ["quote"],
    mutationFn: GetSearchQuote,
    onSuccess: (data) => {
      queryClient.setQueryData(["quote"], data);
    },
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    GetQuoteWithPageNo({ page: newPage, limit: quoterows });
  };

  const handleChangeSearch = (event) => {
    const query = String(event.target.value).split(" ").join("+").toLowerCase();
    if (query.length >= 1) {
      setPage(1);
      GetQuoteWithSearch(query);
    } else {
      refetch();
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    setrows(Number(event.target.value));
    GetQuoteWithPageNo({ page: 1, limit: event.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" textAlign={"center"} gutterBottom>
        Quotes
      </Typography>
      <Stack
        alignItems={"center"}
        justifyContent={"space-around"}
        direction={"row"}
        p={2}
        spacing={2}
        flexWrap={'wrap'}
        gap={2}
        position={'sticky'}
        top={0}
        bgcolor={'white'}
      >
        <FormControl sx={{ width: { sm: 250, md: 450 } }}>
          <TextField
            size="small"
            placeholder="Search here ..."
            onChange={handleChangeSearch}
            type="search"
          />
        </FormControl>
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="page-rows">Quotes Per Page</InputLabel>
          <Select
            size="small"
            id="page-rows-select"
            labelId="page-rows"
            label="Quotes Per Page"
            onChange={handleChangeRowsPerPage}
            defaultValue={20}
          >
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Stack alignItems={"center"} direction={"column"} spacing={1}>
        {isLoading && (
          <Typography variant="h6" textAlign={"center"}>
            Loading....
          </Typography>
        )}
        {isError && (
          <Typography color="red" variant="h6" textAlign="center">
            Something Error!
          </Typography>
        )}
        {data?.results.length ? (
          data.results.map((quote, index) => (
            <QuoteItem quote={quote} key={index} />
          ))
        ) : (
          <Typography color="gray" textAlign={"center"} p={2}>
            No Quotes Found...
          </Typography>
        )}
        {!isLoading && !isError && data?.results.length ? (
          <Pagination
            count={data?.totalPages}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
          />
        ) : (
          ""
        )}
      </Stack>
    </Container>
  );
};

export default Quotes;
