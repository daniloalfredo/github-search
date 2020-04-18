export interface UserDetails{
    name: string;
    login: string;
    avatar: string;
    company: string;
    location: string;
    followers: number;
    followed: number;
    public_repos: number;
}

export interface Repo
{
    name: string;
    description: string;
    stargazers_count: number;
}

export interface AppState
{
    userDetails?: UserDetails;
    UserRepos?: Repo[];
}