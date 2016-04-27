# Community Health Assessment   [![Build Status](https://travis-ci.org/CityOfPhiladelphia/community-health-report.svg?branch=master)](https://travis-ci.org/CityOfPhiladelphia/community-health-report)
Work in progress

User (Department Staff) Guide available in [Wiki](https://github.com/CityOfPhiladelphia/community-health-explorer/wiki/Maintaining-and-Updating-Data)

## Access to Edit Data
- requires [Github.com](https://github.com) account
- Add users to [PublicHealth](https://github.com/orgs/CityOfPhiladelphia/teams/publichealth) team to grant commit access to this repository
- Users may login to [prose.io](http://prose.io/#CityOfPhiladelphia/community-health-explorer/) via their Github account and select this repository
- Choose the `.csv` file and make your edits
- When finished, click `Save` icon at right
- Your changes will be committed to the repository and the application should reflect the updates within a few minutes

**Important**: Edits made to data will be visible in production once saved - use with caution

## Developing
To watch for changes and run a web server at `localhost:4000`, use:
```bash
jekyll serve --baseurl ""
```
