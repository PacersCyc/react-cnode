const ejs = require('ejs');
const serialize = require('serialize-javascript');
const asyncBootstrap = require('react-async-bootstrapper');
const ReactDOMServer = require('react-dom/server');
const Helmet = require('react-helmet').default;

const SheetsRegistry = require('react-jss').SheetsRegistry;
const create = require('jss').create;
const preset = require('jss-preset-default').default;
const createMuiTheme = require('@material-ui/core/styles').createMuiTheme;
const createGenerateClassName = require('@material-ui/core/styles/createGenerateClassName').default;
const colors = require('@material-ui/core/colors');

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const user = req.session.user;
    const createStoreMap = bundle.createStoreMap;
    const createApp = bundle.default;
    const routerContext = {};
    const stores = createStoreMap();

    if (user) {
      stores.appState.user.isLogin = true;
      stores.appState.user.info = user;
    }

    const sheetsRegistry = new SheetsRegistry();
    const jss = create(preset());
    jss.options.createGenerateClassName = createGenerateClassName;
    const theme = createMuiTheme({
      palette: {
        primary: colors.pink,
        secondary: colors.lightBlue,
        // accent: colors.lightBlue,
        type: 'light',
      }
    });
    const app = createApp(stores, routerContext, sheetsRegistry, jss, theme, req.url);

    asyncBootstrap(app).then(() => {

      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url);
        res.end();
        return;
      }

      const helmet = Helmet.rewind();

      const content = ReactDOMServer.renderToString(app);
      const state = getStoreState(stores);

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString(),
        materialCss: sheetsRegistry.toString(),
      });
      res.send(html);
      resolve();
    }).catch(reject);
  })
}