import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchRepositories, type SearchParams } from "./api";

type GithubRepoSearchProps = {
  title: string;
} & ComponentPropsWithoutRef<"div">;

export default function GithubRepoSearch(props: GithubRepoSearchProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [sort, setSort] = useState<SearchParams["sort"]>("best-match");
  const [order, setOrder] = useState<SearchParams["order"]>("desc");

  //const queryClient = useQueryClient();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const params = {
    query: debouncedQuery,
    page,
    perPage,
    sort,
    order,
  };

  const query = useQuery({
    queryKey: ["repositories", params],
    queryFn: ({ signal }) => searchRepositories(params, signal),
    enabled: params.query.length > 0,
  });

  return (
    <div className={`repo-search-container ${props.className ?? ""}`}>
      <div className="repo-search-header">
        <h1>{props.title}</h1>
        <input
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="filters-container">
          <div className="filter-item">
            <label htmlFor="page-size">Items per page</label>
            <select
              id="page-size"
              name="page-size"
              value={perPage}
              onChange={(e) => {
                setPerPage(+e.target.value);
                setPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              name="sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SearchParams["sort"]);
                setPage(1);
              }}
            >
              <option value="best-match">Best match</option>
              <option value="stars">Stars</option>
              <option value="updated">Recently updated</option>
            </select>
          </div>

          <div className="filter-item">
            <label htmlFor="order">Order</label>
            <select
              id="order"
              name="order"
              value={order}
              onChange={(e) => {
                setOrder(e.target.value as SearchParams["order"]);
                setPage(1);
              }}
              disabled={sort === "best-match"}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="repo-list">
        {query.isFetching && <p>Loading</p>}
        {query.isError && <p role="alert">{query.error.message}</p>}
        {query.isSuccess && query.data?.items.length === 0 && (
          <p>No results found</p>
        )}
        <ul>
          {query.data?.items.map((repo) => (
            <li key={repo.id}>
              {repo.fullName} - <a href={repo.htmlUrl}>{repo.htmlUrl}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
