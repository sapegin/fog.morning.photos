# Is it foggy in Berlin?

Powered by [Tâmia](https://tamiadev.github.io/tamia/), [Gatsby](https://www.gatsbyjs.org/), [styled-components](https://www.styled-components.com/) and [styled-system](https://styled-system.com/).

## Running locally

First clone the repo, install dependencies and build the site:

```bash
git clone https://github.com/sapegin/fog.morning.photos.git
cd fog.morning.photos
npm install
npm run build
```

Then run dev server (it will refresh the page after any changes in JS, styles or content):

```bash
npm start
```

## Configuration

The app requires following environment variables:

* `WINDY_KEY` — [Windy Webcams API](https://api.windy.com/webcams) key
* `FOG_LAT` — location latitude
* `FOG_LNG` — location longtitude
* `FOG_EXCLUDE` — webcam IDs to exclude, comma separated


## Author

- [Artem Sapegin](https://sapegin.me)

---

## License

Feel free to fork this repository and adapt to your needs.
