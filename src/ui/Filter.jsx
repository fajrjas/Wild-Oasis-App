import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === true &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  // let activeAll;
  // if (!searchParams.get("discount")) activeAll = "all";

  // console.log(!searchParams.get("discount"));

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
    console.log(searchParams.get("discount"));
  }

  return (
    <StyledFilter>
      {/* <FilterButton onClick={() => handleClick("all")}>All</FilterButton> */}
      {options &&
        options.map((filter) => (
          <FilterButton
            onClick={() => handleClick(filter.value)}
            key={filter.value}
            active={currentFilter === filter.value}
            disabled={currentFilter === filter.value}
          >
            {filter.label}
          </FilterButton>
        ))}
    </StyledFilter>
  );
}

export default Filter;
