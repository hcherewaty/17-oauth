![CF](http://i.imgur.com/7v5ASc8.png) OAuth Comparative Analysis
================================================================

## OAuth Auth0

### Research Conducted By: Heather Cherewaty, Brent Woodward, & Jacob Anderson

### Overall Score and Comments
#### Score (Out of 10): 7
#### General Comments
We have a backend server that uses Auth0 as a service to handle authentication and authorization. No need for a database, or to even handle it ourselves. 
We render backend using pugJS. It's like ejs, but crappy.

#### Pros
* Easy to impliment, you can just follow their tutorial and proof of concept with little effort.
* Don't have to worry about whether or not our authentication and authorization is done correctly. These guys are pros and hav it already figured out.
* Very extendable, implimenting new website accounts would take mere minutes.

#### Cons
* Rate limited unless you pay. Then you're still rate limited, but less. $13/mo gets you 1,000 active users with 2 days of log retention. $745/mo gets you 5,000 active users with 10 days of login retention. 
* PugJS

### Ratings and Reviews
#### Documentation


#### Systems Requirements
Dependencies: passport, passport-auth0, express, express-session, dotenv, cors, pug, morgan, auth0-js.

#### Ramp-Up Projections
Junior-mid level devs could come up to speed on basic use/implementation 4-6 hours. They could extend and utilize for additional services that day.

#### Community Support and Adoption levels
Auth0 has a variety of customers, Bluetooth, Nvidia, Atlassian, Mozilla, PBS, Dow Jones, Harvard Medical School to name a few. 


### Links and Resources
* [framework](https://auth0.com/)
* [docs](https://auth0.com/docs/getting-started)
* [examples/tutorials](https://auth0.com/)

### Code Demos
* [live/running application](http://xyz.com)
* [code repository](https://github.com/hcherewaty/17-oauth)

### Operating Instructions
If someone were to download your repo (above), what steps do they need to take to run the application
* `npm start`
* Endpoint: `/`
  * Renders index.pug.
* Endpoint: `/user/`
  * Gets user profile.
* Endpoint: `/login/`
  * Perform login, afterwards Auth0 will redirect to callback.
* Endpoint: `/callback/`
  * Perform the final stage of authentication and redirect to previously requested URL or '/user'.
* Endpoint: `/logout/`
  * Perform session logout and redirect to homepage.

