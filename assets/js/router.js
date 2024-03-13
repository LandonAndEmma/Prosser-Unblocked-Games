let routes = {};
let templates = {};
function view(url, title) {
    let appDiv = document.getElementById("main-content");
    fetch(url).then(function (page) {
        return page.text();
    }).then(function (html) {
        setInnerHTML(appDiv, html);
        setTitle(title);
    });
}
function route(path, template) {
    if (typeof template === 'function') {
        return routes[path] = template;
    }
    else if (typeof template === 'string') {
        return routes[path] = templates[template];
    } else {
        return;
    };
};
function template(name, templateFunction) {
    return templates[name] = templateFunction;
};
function resolveRoute(route) {
    try {
        return routes[route];
    } catch (e) {
        throw new Error(`Route ${route} not found`);
    };
};
function router(evt) {
    let url = window.location.hash.slice(1) || '/';
    let routeFunc = resolveRoute(url);
    console.log(url);
    routeFunc();
};
function initRoutes() {
    // Define templates here
    template('home', () => view("pages/home.htm"));
    template('games', () => view("pages/games.htm", "Games"));
    template('contact', () => view("pages/contact.htm", "Contact"));
    template('games-eaglercraft', () => view("pages/games/eaglercraft.htm", "Eaglercraft"));
    template('games-super-mario-sixty-four', () => view("pages/games/sm64.htm", "Super Mario 64"));
    template('games-mario-kart-ds', () => view("pages/games/mkds.htm", "Mario Kart DS"));
    template('games-new-super-mario-bros', () => view("pages/games/nsmb.htm", "New Super Mario Bros"));
    // Define routes here
    route('/', 'home');
    route('/games', 'games');
    route('/contact', 'contact');
    route('/games/eaglercraft', 'games-eaglercraft');
    route('/games/super-mario-sixty-four', 'games-super-mario-sixty-four');
    route('/games/mario-kart-ds', 'games-mario-kart-ds');
    route('/games/new-super-mario-bros', 'games-new-super-mario-bros');
}
initRoutes();
// Add event listeners
window.addEventListener('load', router);
window.addEventListener('hashchange', router);