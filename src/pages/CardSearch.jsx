import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import '../index.css'
import { alpha } from "@mui/material";

import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  Button,
} from "@mui/material";

import Cards from "../components/cards";

import useFetch from "../hooks/useFetch";

function CardSearch() {
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState("");

  const { data, loading, error } = useFetch(
    `https://db.ygoprodeck.com/api/v7/cardinfo.php?num=10&offset=${page}${filters}`
  );

  const nextPage = () => setPage((prev) => prev + 10);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 10));

  const applyFilter = () => {
    const filterParts = [];

    Object.keys(filterStatus).forEach((key) => {
      if (filterStatus[key] && filterValue[key]) {
        filterParts.push(`&${key}=${encodeURIComponent(filterValue[key])}`);
      }
    });

    const filterString = filterParts.join('');

    setPage(0)
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
  })

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
              bgcolor: alpha("#adbbebff", 0.8)
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
                  style={{ visibility: filterStatus.atk ? "visible" : "hidden", width: 100 }}
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
                  style={{ visibility: filterStatus.def ? "visible" : "hidden", width: 100 }}
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
                  style={{ visibility: filterStatus.level ? "visible" : "hidden", width: 100 }}
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
                <button className="button" size="small" onClick={applyFilter}>Apply</button>
              </FormGroup>
            </FormControl>
          </Paper>
        </Grid>

        {/* Cards */}
        <Grid item>
          <Cards cards={data} loading={loading}></Cards>
          <button className="button" onClick={prevPage} disabled={page === 0}>
            Previous
          </button>
          <button
            className="button"
            onClick={nextPage}
            disabled={loading || data?.data?.length < 10}
          >
            Next
          </button>
        </Grid>
      </Grid>
    </>
  );
}

export default CardSearch;
