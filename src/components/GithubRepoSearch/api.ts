export type Repository ={
    id: number;
    name: string;
    fullName: string;
    htmlUrl: string;
    description: string | null;
    stargazersCount: number;
}

export type ApiRepository = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
}

export type SearchParams = {
    query: string;
    sort: "best-match" | "stars" | "forks" | "help-wanted-issues" | "updated";
    order: "asc" | "desc";
    perPage: number;
    page: number;
}

export type SearchResponse = {
    totalCount: number;
    items: Repository[];
}

export type ApiSearchResponse = {
    total_count: number;
    items: ApiRepository[];
}

export async function searchRepositories(params: SearchParams, signal?: AbortSignal): Promise<SearchResponse> {
    const searchParams = new URLSearchParams({
        q: params.query,
        order: params.order,
        per_page: String(params.perPage),
        page: String(params.page),
    })

    if (params.sort !== "best-match") {
        searchParams.set("sort", params.sort);
    }

    const response = await fetch(`https://api.github.com/search/repositories?${searchParams}`, { signal });

    if (!response.ok) {
        throw new Error(`The search has failed: ${response.status}`);
    }

    const data: ApiSearchResponse = await response.json();

    return {
        totalCount: data.total_count,
        items: data.items.map((item) => ({
            id: item.id,
            name: item.name,
            fullName: item.full_name,
            htmlUrl: item.html_url,
            description: item.description,
            stargazersCount: item.stargazers_count,
        })),
    }
}
