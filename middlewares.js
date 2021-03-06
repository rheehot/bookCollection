import routes from './routes';

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "BookCollection";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    console.log("hello", res.locals.loggedUser);
    next(); 
}