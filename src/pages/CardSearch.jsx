import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../index.css";
import Cards from "../components/cards";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  alpha,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";

function CardSearch() {
  //page and filter states
  const getStoredPage = () => {
    const stored = localStorage.getItem("page");
    return stored ? stored : 0;
  };

  const getStoredFilters = () => {
    const stored = localStorage.getItem("filters");
    return stored ? stored : "";
  };

  const [page, setPage] = useState(getStoredPage);
  const [filters, setFilters] = useState(getStoredFilters);

  //local storage
  useEffect(() => {
    localStorage.setItem("page", page);
  }, [page]);

  useEffect(() => {
    localStorage.setItem("filters", filters);
  }, [filters]);

  //fetch query
  const fetchCards = async (page, filters) => {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=${page}${filters}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cards", page, filters],
    queryFn: () => fetchCards(page, filters),
  });

  //page calculation for buttons
  const nextPage = () => setPage((prev) => prev + 10);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 10));


  //filter logic
  const applyFilter = () => {
    const filterParts = [];

    Object.keys(filterStatus).forEach((key) => {
      if (filterStatus[key] && filterValue[key]) {
        filterParts.push(`&${key}=${encodeURIComponent(filterValue[key])}`);
      }
    });

    const filterString = filterParts.join("");

    setPage(0);
    setFilters(filterString);
  };

  const [filterStatus, setFilterStatus] = useState({
    atk: false,
    def: false,
    name: false,
    type: false,
    level: false,
  });

  const [filterValue, setFilterValue] = useState({
    atk: "",
    def: "",
    name: "",
    level: "",
  });

  const handleFilterStatus = (event) => {
    setFilterStatus({
      ...filterStatus,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFilterInput = (event) => {
    setFilterValue({
      ...filterValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Grid container>
        {/* Sidebar */}
        <Grid className="sidebar" item maxWidth={2} marginRight={30}>
          <Paper
            elevation={2}
            sx={{
              p: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: alpha("#adbbebff", 0.8),
            }}
          >
            <FormControl component="fieldset" variant="standard">
              <FormLabel component="legend">Filter</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterStatus.atk}
                      onChange={handleFilterStatus}
                      name="atk"
                    />
                  }
                  label="ATK"
                />
                <input
                  name="atk"
                  style={{
                    visibility: filterStatus.atk ? "visible" : "hidden",
                    width: 100,
                  }}
                  onChange={handleFilterInput}
                  value={filterValue.atk}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterStatus.def}
                      onChange={handleFilterStatus}
                      name="def"
                    />
                  }
                  label="DEF"
                />
                <input
                  name="def"
                  style={{
                    visibility: filterStatus.def ? "visible" : "hidden",
                    width: 100,
                  }}
                  onChange={handleFilterInput}
                  value={filterValue.def}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filterStatus.level}
                      onChange={handleFilterStatus}
                      name="level"
                    />
                  }
                  label="LEVEL"
                />
                <select
                  name="level"
                  style={{
                    visibility: filterStatus.level ? "visible" : "hidden",
                    width: 100,
                  }}
                  onChange={handleFilterInput}
                  value={filterValue.level}
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <button className="button" size="small" onClick={applyFilter}>
                  Apply
                </button>
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Cards */}
        <Grid item>
          <Cards cards={data} loading={isLoading}></Cards>
          <button className="button" onClick={prevPage} disabled={page === 0}>
            Previous
          </button>
          <button
            className="button"
            onClick={nextPage}
            disabled={isLoading || data?.data?.length < 10}
          >
            Next
          </button>
        </Grid>
      </Grid>
    </>
  );
}

export default CardSearch;
