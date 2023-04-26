# ParkIT UI

A React user interface for a parking reservation system. The user interface allows users to create, view, and cancel reservations. Users can also save, view, and delete vehicles. The user interface uses a mock server to display generated data and simulate scenarios such as error cases.

![test](https://user-images.githubusercontent.com/55976294/228769109-772dd878-addd-4ac3-89f7-a3f1953098a0.gif)

## Table of contents

- [Architecture](#architecture)
- [Open API-Spec](#open-api-spec)
- [Technologies](#technologies)
- [Development](#development)
- [Contributing](#contributing)

## Architecture

### Component architecture

The user interface consists of the following component structure:

![Komponentendiagramm](https://user-images.githubusercontent.com/55976294/228766431-97fe6c58-9d31-44bc-9d29-93c042fc6199.png)

## Open API-Spec

This user interface makes use of the [parkit-spec](parkit-spec)

## Technologies

Project is created with:

- [React: 18.2.0](https://react.dev/)
- [MUI: 5.11.13](https://mui.com/)
- [Swagger Client: 3.18.5](https://github.com/berufsbildung-basel/parkit-spec)

## Development

### Installing

```bash
git clone https://github.com/raquelima/IPA-Lima.git
cd IPA-Lima
npm install
```

### Running locally

```bash
cd IPA-Lima
npm run dev
```

## Contributing

To contribute follow these steps:

- Create a new branch (git checkout -b <feature-branch>)
- Make the changes in the files
- Commit your changes (git commit -m 'Improve feature')
- Push to the branch (git push origin <feature-branch>)
- Create a Pull Request
