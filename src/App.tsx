import React, {useState} from "react";
import graphql from "babel-plugin-relay/macro";
import styled from "styled-components";
import {QueryRenderer} from "react-relay";

import ClinicalTrials from "./ClinicalTrials";
import environment from "./environment";
import {AppQuery} from "./__generated__/AppQuery.graphql";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

export type PatientsSortDirection = 'asc' | 'desc' | null;
export type CitiesSortDirection = 'asc' | 'desc' | null;
export type CountriesFilter = string;
export type CountriesList = string[];

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] = useState<PatientsSortDirection>(null);
  const [citiesSortDirection, setCitiesSortDirection] = useState<CitiesSortDirection>(null);
  const [countriesFilter, setCountriesFilter] = useState<CountriesFilter>("");
  const [countriesList, setCountriesList] = useState<CountriesList>([]);

    return (
      <Layout>
        <Content>
          <QueryRenderer<AppQuery>
            environment={environment}
            query={graphql`
          query AppQuery($patientsSortDirection: String, $citiesSortDirection: String, $countriesFilter: String)  {
            clinicalTrials(patientsSortDirection:$patientsSortDirection, citiesSortDirection:$citiesSortDirection, countriesFilter:$countriesFilter) {
              country
              patients
              site
              city
            }
          }
        `}
            variables={{patientsSortDirection, citiesSortDirection, countriesFilter, countriesList}}
            render={({props}) => {
              if (!props) {
                return;
              }
              return <ClinicalTrials patientsSortDirection={patientsSortDirection}
                                     setPatientsSortDirection={setPatientsSortDirection}
                                     citiesSortDirection={citiesSortDirection}
                                     setCitiesSortDirection={setCitiesSortDirection}
                                     countriesFilter={countriesFilter}
                                     setCountriesFilter={setCountriesFilter}
                                     countriesList={countriesList}
                                     setCountriesList={setCountriesList}
                                     clinicalTrials={props.clinicalTrials}/>;
            }}
          />
        </Content>
      </Layout>
    );
};

export default App;
