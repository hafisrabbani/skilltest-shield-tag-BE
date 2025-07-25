import app from "./configs/http.js"
import "dotenv/config"
import errorMiddleware from "./router/middleware/errorMiddleware.js";
import {cmd} from "./configs/winston.js";
import {connectRedis} from "./configs/redis.js";
import routes from "./router/routes/auth.js";
import "./app/listeners/LogListener.js";
const port = process.env.APP_PORT || 8000;
connectRedis();
app.use('/api/v1', routes);
app.use(errorMiddleware);
app.listen(port, () => { cmd.log("info", `Server is running on port ${port}`) });