import db from "../../configs/db.js";

export default class LogService {
    async insert(req){
        const data = {
            user_id: req.user_id,
            action: req.action,
            ip_address: req.ip,
            user_agent: req.user_agent,
        }
        await db('auth_logs').insert(data);
    }
}