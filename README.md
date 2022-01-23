
## Pre-assignment for Reaktor Summer 2022 Developer position
[![Node.js CI](https://github.com/sainigma/reaktor-assignment-2022/actions/workflows/node.js.yml/badge.svg)](https://github.com/sainigma/reaktor-assignment-2022/actions/workflows/node.js.yml)
[![coverage](https://github.com/sainigma/reaktor-assignment-2022/actions/workflows/coverage.yml/badge.svg)](https://github.com/sainigma/reaktor-assignment-2022/actions/workflows/coverage.yml)

Live version available at [http://1030321.xyz/reaktor/](http://1030321.xyz/reaktor/)

### Installing

   1. Clone the repo with `git clone git@github.com:sainigma/reaktor-assignment-2022.git`
   2. Build frontend with `cd frontend && npm install && npm run build`
   3. Install backend with `cd ./../backend && npm install`
   4. Configure the dotenv file (.env). It expects the following format:


    PORT=80
    STATIC="./../frontend/build/"
    DEBUG=0

   5. Run project with `npm run start`
