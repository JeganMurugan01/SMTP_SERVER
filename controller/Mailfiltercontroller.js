const { Emailfilter } = require("../models/Mailfilter");

const mailfiltercontroller={
    
    filter(req,response){
            const subject=req.query.title;
            const user_id=req.query.userid
            Emailfilter.mailfilter(subject,user_id,(err,res)=>{
                console.log(res,"response search")
                console.log(err,"response err")
                if(err)
                {
                    response.status(400).send({Error:"Something went wrong"})
                }
                if(res)
                {
                    response.status(200).send({res})
                }
            })
    }
}
module.exports={mailfiltercontroller}