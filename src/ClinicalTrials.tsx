import styled from "styled-components";
import React, { Fragment, useCallback } from "react";

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { PatientsSortDirection, CitiesSortDirection } from "./App";

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
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  citiesSortDirection,
  setCitiesSortDirection
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

  const toggleCitiesSortDirection = useCallback(() => {
    if (citiesSortDirection == null) {
      setCitiesSortDirection("asc");
    } else if (citiesSortDirection === "asc") {
      setCitiesSortDirection("desc");
    } else {
      setCitiesSortDirection(null);
    }
  }, [citiesSortDirection, setCitiesSortDirection]);

  const capitalizeWord = (word: string) => {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  return (
    <Fragment>
      <h1>Clinical trials</h1>
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

const sortCityDirectionIndicator = (
  citiesSortDirection: CitiesSortDirection
) => {
  if (citiesSortDirection === "asc") return "↓A-Z";
  if (citiesSortDirection === "desc") return "↑Z-A";
  return "";
};

export default ClinicalTrials;
