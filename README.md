# Community Health Explorer  

Host, edit and visualize CSV-based data using [Jekyll](http://jekyllrb.com/), [Leaflet](http://leafletjs.com) & [Chartist](https://gionkunz.github.io/chartist-js/)

[Read more](https://alpha.phila.gov/posts/open-data-digital-transformation/2016-08-10-citys-new-digital-resource-on-public-health/) about developing the Health Explorer.

This application uses the City of Philadelphia pattern portfolio.
[Documentation](http://cityofphiladelphia.github.io/patterns/) | [Source](https://github.com/CityOfPhiladelphia/patterns)

![](https://CityOfPhiladelphia.github.io/community-health-explorer/assets/images/share.jpg)

## Managing Data
- User (Department Staff) Guide available in [Wiki](https://github.com/CityOfPhiladelphia/community-health-explorer/wiki/Maintaining-and-Updating-Data)

### Access to Edit Data
- requires [Github.com](https://github.com) account
- Add users to [PublicHealth](https://github.com/orgs/CityOfPhiladelphia/teams/publichealth) team to grant commit access to this repository
- Users may login to [prose.io](http://prose.io/#CityOfPhiladelphia/community-health-explorer/) via their Github account and select this repository
- Choose the `.csv` file and make your edits
- When finished, click `Save` icon at right
- Your changes will be committed to the repository and the application should reflect the updates within a few minutes

**Important**: _Edits made to data will be visible in production once saved - use with caution_

## Developing
To watch for changes and run a web server at `localhost:4000`, use:
```bash
jekyll serve --baseurl ""
```
