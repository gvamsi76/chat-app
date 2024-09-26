
//  to handle the routes
const express = require('express');
const useRouter = require("./userRoute");
const useChart = require("./chatRoute");
const useMassage = require("./massageRoute");

const router = express.Router();

const defaultRoutes = [
    {
        path: '/users',
        route: useRouter,
    },
    {
        path: '/charts',
        route: useChart,
    },
    {
        path: '/massages',
        route: useMassage,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;