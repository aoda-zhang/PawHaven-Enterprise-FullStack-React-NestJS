import * as React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  text-align: center;
`;

interface Props {
  title: string;
  content: Array<{ name: string; value: string }>;
}
export const TripSubmitSuccess: React.FC<Props> = ({ title, content }) => {
  return (
    <>
      <Title>{title}</Title>
      {content?.map((item, index) => (
        <div key={index}>
          <span>{item?.name}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </>
  );
};
