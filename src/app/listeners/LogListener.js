import {cmd} from "../../configs/winston.js";
import eventEmitter from "../../configs/event.js";
import LogService from "../service/LogService.js";

eventEmitter.on('user.logged_in', (data) => {
    new LogService().insert({
        user_id: data.user_id,
        action: 'login',
        ip: data.ip,
        user_agent: data.user_agent
    }).then(() => {
        cmd.log("info", `User ${data.email} logged in from IP: ${data.ip}`);
    }).catch(err => {
        cmd.log("error", `Failed to log user login event: ${err.message}`);
    });
});

eventEmitter.on('user.logged_out', (data) => {
    new LogService().insert({
        user_id: data.user_id,
        action: 'logout',
        ip: data.ip,
        user_agent: data.user_agent
    }).then(() => {
        cmd.log("info", `User ${data.user_id} logged out from IP: ${data.ip}`);
    }).catch(err => {
        cmd.log("error", `Failed to log user logout event: ${err.message}`);
    });
});
eventEmitter.on('user.registered', (data) => {
    new LogService().insert({
        user_id: data.user_id,
        action: 'register',
        ip: data.ip,
        user_agent: data.user_agent
    }).then(() => {
        cmd.log("info", `User ${data.email} registered from IP: ${data.ip}`);
    }).catch(err => {
        cmd.log("error", `Failed to log user registration event: ${err.message}`);
    });
});

