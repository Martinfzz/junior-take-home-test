import styled from "styled-components";
import React, { Fragment, useCallback, useEffect } from "react";

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { PatientsSortDirection, CitiesSortDirection, CountriesFilter, CountriesList } from "./App";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);

  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

interface Props {
  clinicalTrials: AppQueryResponse["clinicalTrials"];
  patientsSortDirection: PatientsSortDirection;
  setPatientsSortDirection: (
    patientsSortDirection: PatientsSortDirection
  ) => void;
  citiesSortDirection: CitiesSortDirection;
  setCitiesSortDirection: (
    CitiesSortDirection: CitiesSortDirection
  ) => void;
  countriesFilter: CountriesFilter;
  setCountriesFilter: (
    CountriesFilter: CountriesFilter
  ) => void;
  countriesList: CountriesList;
  setCountriesList: (
    CountriesList: CountriesList
  ) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  citiesSortDirection,
  setCitiesSortDirection,
  countriesFilter,
  setCountriesFilter,
  countriesList,
  setCountriesList
}: Props) => {
  const togglePatientsSortDirection = useCallback(() => {
    if (patientsSortDirection == null) {
      setPatientsSortDirection("asc");
    } else if (patientsSortDirection === "asc") {
      setPatientsSortDirection("desc");
    } else {
      setPatientsSortDirection(null);
    }
  }, [patientsSortDirection, setPatientsSortDirection]);

  // Callback to sort cities by alphabetical order
  const toggleCitiesSortDirection = useCallback(() => {
    if (citiesSortDirection == null) {
      setCitiesSortDirection("asc");
    } else if (citiesSortDirection === "asc") {
      setCitiesSortDirection("desc");
    } else {
      setCitiesSortDirection(null);
    }
  }, [citiesSortDirection, setCitiesSortDirection]);

  // Use to set the countries searched
  const toggleCountriesFilter = (e: any) => {
    setCountriesFilter(e.target.value);
  };
  
  // Capitalize the city
  const capitalizeWord = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }
  
  // Callback to set and filter counties for selection
  const filteredList = useCallback(() => {
    if (countriesList.length === 0) {
      let list: any = [];

      list = clinicalTrials.map(clinicalTrial => (
        clinicalTrial.country
      )).filter(function(item: any, pos: any, self: any) {
        return self.indexOf(item) === pos;
      })
      setCountriesList(list);
    }
  }, [countriesList, setCountriesList, clinicalTrials]);
  
  // Call of the filtered country list
  useEffect(() => {
    filteredList();
  }, [filteredList])

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <select name="filterCountry" id="filter-country" onChange={toggleCountriesFilter}>
        <option value="">--Please choose an option--</option>
        <option value={[]}>All Countries</option>
        {countriesList.map((element, index) => (
            <option value={element} key={index}>{element}</option>
          ))}
      </select>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <HeaderCell>country</HeaderCell>
          <ClickableHeaderCell onClick={toggleCitiesSortDirection}>
            city{sortCityDirectionIndicator(citiesSortDirection)}
            </ClickableHeaderCell>
          <ClickableHeaderCell onClick={togglePatientsSortDirection}>
            patients{sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map(clinicalTrial => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{capitalizeWord(clinicalTrial.city)}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicator = (
  patientsSortDirection: PatientsSortDirection
) => {
  if (patientsSortDirection === "asc") return "↑";
  if (patientsSortDirection === "desc") return "↓";
  return "";
};

// Display indicator for sorted cities
const sortCityDirectionIndicator = (
  citiesSortDirection: CitiesSortDirection
) => {
  if (citiesSortDirection === "asc") return "↓A-Z";
  if (citiesSortDirection === "desc") return "↑Z-A";
  return "";
};

export default ClinicalTrials;
