import React from 'react';
import uuidv1 from 'uuid/v1';
import { FullHeightWrapper, ColumnWrapper, Column } from 'containers/About/styles';
import { RichText } from 'prismic-reactjs';
import './Columns.scss';


const Columns = ({ data }) => {
  const { items } = data;
  const getColumnCount = () => {
    switch (data.primary.layout) {
      case 'col-2': return 2;
      case 'col-3': return 3;
      case 'col-4': return 4;
      default: return 3;
    }
  };

  return (
    <FullHeightWrapper>
      <ColumnWrapper>
        {items.map(item => (
          <Column key={uuidv1()} items={getColumnCount()} fullMobile>
            {RichText.render(item.text)}
          </Column>
      ))}
      </ColumnWrapper>
    </FullHeightWrapper>
  );
};

export default Columns;
