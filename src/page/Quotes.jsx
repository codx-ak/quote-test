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
  //quotes perpage state
  const [quoterows, setrows] = useState(20);
  //   quotes page no  state
  const [page, setPage] = useState(1);

  const [searchquery,setSearchQuery]=useState("")

  const queryClient = useQueryClient();

  // getting default data from pageno=1 and limit=20
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["quote"],
    queryFn: () => GetQuote(1, 20),
  });

  // getting data based on pages no and limit values
  const { mutateAsync: GetQuoteWithPageNo, isPending } = useMutation({
    mutationKey: ["quote"],
    mutationFn: GetQuote,
    onSuccess: (data) => {
      queryClient.setQueryData(["quote"], data);
    },
  });

  //getting data from search query
  const { mutateAsync: GetQuoteWithSearch, isPending: isPending_2 } =
    useMutation({
      mutationKey: ["quote-2"],
      mutationFn: GetSearchQuote,
      onSuccess: (data) => {
        queryClient.setQueryData(["quote"], data);
      },
    });

  //changeing page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(searchquery.length){
      GetQuoteWithSearch({query:searchquery,limit:quoterows});
    }
    else{
      GetQuoteWithPageNo({ page: newPage, limit: quoterows });
    }
  };

  //changing search query
  const handleChangeSearch = (event) => {
    const query = String(event.target.value).split(" ").join("+").toLowerCase();
    setSearchQuery(query)
    if (query.length >= 1) {
      setPage(1);
      GetQuoteWithSearch({query:query,limit:quoterows});
    } else {
      refetch();
    }
  };

  // changing pagination
  const handleChangeRowsPerPage = (event) => {
    setPage(1);
    const PageRowValue=Number(event.target.value)
    setrows(PageRowValue);
    if(searchquery.length){
      GetQuoteWithSearch({query:searchquery,limit:PageRowValue});
    }
    else{
      GetQuoteWithPageNo({ page: page, limit: PageRowValue });
    }
  };
  if (isLoading) {
    <Typography variant="h6" textAlign={"center"}>
      Loading....
    </Typography>;
  }
  if (isError) {
    <Typography variant="h6" textAlign={"center"}>
      Somthing Error!{" "}
    </Typography>;
  }
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
        flexWrap={"wrap"}
        gap={2}
        position={"sticky"}
        top={0}
        bgcolor={"white"}
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
        {isPending || isPending_2 ? (
          <Typography variant="h6" textAlign={"center"}>
            Loading....
          </Typography>
        ) : data?.results.length ? (
          data.results.map((quote, index) => (
            <QuoteItem quote={quote} key={index} />
          ))
        ) : (
          <Typography color={"gray"} p={2}>
            No Quotes Found
          </Typography>
        )}
        {!isLoading && !isPending && !isPending_2 && data?.results.length ? (
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
