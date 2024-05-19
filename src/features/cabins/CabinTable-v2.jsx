import styled, { css } from "styled-components";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

import { useCabins } from "./useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  min-height: 50dvh;
  max-height: 70dvh;
  overflow-y: auto;
  scrollbar-width: none;
  ${(props) => {
    // console.log(props.type === "modal");

    return (
      props.type === "modal" &&
      css`
        height: 90dvh;
        overflow: auto;
        /* scroll-padding-left: 2px; */
        scrollbar-width: none;
        scroll-behavior: smooth;
      `
    );
  }}
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable({ type }) {
  const { cabins, isLoading, error } = useCabins();

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <>
        {/* {toast.error(error.message)} */}
        {error.message}
      </>
    );

  return (
    <Table role="table" type={type}>
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.length === 0 && <div>No Cabin... </div>}
      {cabins.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
}

export default CabinTable;
