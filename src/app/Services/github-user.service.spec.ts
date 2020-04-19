import { TestBed } from '@angular/core/testing';

import { GithubUserService } from './github-user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserDetails } from '../Interfaces';

describe('GithubUserService', () => {
  let service: GithubUserService;
  let mock: HttpTestingController;
  const mockRepos = [
    {
      "name": "Advance-Wars",
      "description": "Projeto IP 2012.2",
      "stargazers_count": 0,
    }
  ];
  const userMock = {
    "login": "daniloalfredo",
    "avatar_url": "https://avatars0.githubusercontent.com/u/3910681?v=4",
    "name": "Danilo Souza",
    "company": null,
    "location": null,
    "email": null,
    "hireable": null,
    "bio": "Bachelor degree in Computer Engineering at UFPE, Brazil. Interested in Internet of Things, Data Science.\r\n\r\n",
    "public_repos": 14,
    "public_gists": 0,
    "followers": 4,
    "following": 4,
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        GithubUserService
      ]
    });
    service = TestBed.get(GithubUserService);
    mock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get valid user data from github', () => {
    service.getUser('daniloalfredo').subscribe((userDetails: UserDetails) => {
      expect(userDetails.login).toBe('daniloalfredo');
    });

    const req = mock.expectOne('https://api.github.com/users/daniloalfredo', 'call to github user api');
    expect(req.request.method).toBe('GET');

    req.flush(userMock);
    mock.verify();
  })

  it('should get empty user data from github (user not found)', () => {
    service.getUser('crapuleta').subscribe(result => {
      expect(result).toBe(null);
    });

    const req = mock.expectOne('https://api.github.com/users/crapuleta', 'call to github user api');
    expect(req.request.method).toBe('GET');
    req.flush({
      "message": "Not Found",
      "documentation_url": "https://developer.github.com/v3/users/#get-a-single-user"
    });
    mock.verify();
  })

  it('should get user repos from github', () => {
    service.getRepos('daniloalfredo').subscribe(result => {
      expect(result.length).toBe(1);
    });

    const req = mock.expectOne('https://api.github.com/users/daniloalfredo/repos', 'call to github user repos api');
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
    mock.verify();
  })

  it('should get no user repos from github (user not found)', () => {
    service.getRepos('crapuleta').subscribe(result => {
      expect(result).toBe(null);
    });
    const req = mock.expectOne('https://api.github.com/users/crapuleta/repos', 'call to github user repos api');
    expect(req.request.method).toBe('GET');
    req.flush({
      "message": "Not Found",
      "documentation_url": "https://developer.github.com/v3/users/#get-a-single-user"
    });
    mock.verify();
  })
});
