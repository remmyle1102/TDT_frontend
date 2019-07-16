import React from 'react';
import styled from 'styled-components';
import MultiSelect from "@khanacademy/react-multi-select"

const Container = styled.div`
  .select-panel > div {
  display: none !important;
  }
`

const CustomMultiSelect = props => {

  return (
    <Container>
      <MultiSelect {...props}/>
    </Container>
  );
};

export default CustomMultiSelect;
