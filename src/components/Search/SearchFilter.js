import Wrapper from "./SearchFilter.styled";
import { FormRowSelect } from "../index";
import {
  categoriesList,
  sortList,
  typesList,
  statesList,
} from "../../utils/arrays";
import { useAppContext } from "../../context/appContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const SearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    searchCategory,
    searchStates,
    searchAuctionType,
    sort,
    handleChange,
    clearFilter,
    getOffers,
    prepareFilter,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
    const { name, value } = e?.target;
    searchParams.set(name, value);
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };
  const handleClear = () => {
    clearFilter();
    searchParams.delete("searchCategory");
    searchParams.delete("searchStates");
    searchParams.delete("searchAuctionType");
    searchParams.delete("sort");
    searchParams.set("page", 1);
    setSearchParams(searchParams);
  };
  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);
    prepareFilter(currentParams);
    getOffers(currentParams);
  }, [searchParams]);

  return (
    <Wrapper>
      <div className="filter-area">
        <FormRowSelect
          labelText="Category"
          name="searchCategory"
          value={searchCategory}
          handleChange={handleSearch}
          list={["All", ...categoriesList]}
        />
        <FormRowSelect
          labelText="States"
          name="searchStates"
          value={searchStates}
          handleChange={handleSearch}
          list={["All", ...statesList]}
        />
        <FormRowSelect
          labelText="Auction Type"
          name="searchAuctionType"
          value={searchAuctionType}
          handleChange={handleSearch}
          list={["All", ...typesList]}
        />
        <FormRowSelect
          labelText="Sort By"
          name="sort"
          value={sort}
          handleChange={handleSearch}
          list={["All", ...sortList]}
        />
        <div className="clear-values" onClick={handleClear}>
          Clear
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchFilter;
