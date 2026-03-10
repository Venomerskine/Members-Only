require("dotenv").config();
const pool =  require("./index")

async function getAllMessages() {
    const query = `
        select 
            u.id as userId,
            u.first_name,
            u.last_name ,
            u.username,
            u.email ,
            u."role" ,
            m.id  as messageId,
            m.title ,
            m.boy_text ,
            m.created_at ,
            m.user_id as messageUserId
        from users u 
        join messages m 
        on m.user_id = u.id 
    `

    return await pool.query(query)
}