const config = require("./conf");
const express = require("express");
const sql = require("mssql");
const router = express.Router();
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx          get    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
router.get("/quest",(req,res) =>{
    async function Getdata(){
        try{ 
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.tabquest")
            res.json(data.recordset)
        } 
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata() 
})

router.get("/questactive",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.tabquest where inuse ='true'")
            res.json(data.recordset)
        } 
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata() 
})

router.get("/rep",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.tabrep order by idq ")
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata() 
})

router.get("/emp",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.employees")
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata()
})
router.get("/admin",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.admins")
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata() 
})

router.get("/questionnaire",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT * FROM dbo.questionnaire")
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }    Getdata() 
})
router.get("/questused",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query("SELECT idq FROM dbo.quest_used group by idq")
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }    Getdata() 
})

/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx          post    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
 router.post("/quest-Send",(req,resp)=>{
    async function Setdata(){
        try{
            await sql.connect(config);
            
            const body_data= (req.body);
            /* console.log(body_data) */
            quest=body_data[0].question;
            /* console.log(quest) */
            tabderep=body_data[1];
            
     
            await sql.query(`INSERT INTO [dbo].[tabquest] (questions) values ('${quest}')` )
             
            ids=await sql.query(`select max(id) as max from [dbo].[tabquest] ` )
           /*  console.log(ids.recordset[0].max) */
             
              for (let i = 0; i < tabderep.tab.length; i++) {
                
                r=tabderep.tab[i].reponse;
                t=tabderep.tab[i]['t/f'];
                await sql.query(`INSERT INTO [dbo].[tabrep] (id,idq, reponse, [t/f])VALUES ('${i+1}','${ids.recordset[0].max}', '${r}', '${t}')`);
            }    
         }     
         catch (err){
            console.log(err)        
            }
            finally{
                sql.close()
            }
    }
    Setdata()
}) 
router.post("/questionnaire-Send",(req,resp)=>{
    async function Setdata(){
        try{
            await sql.connect(config);
            const data= (req.body)
            idq=data.idq
            score=data.score
            tab=data.tab
            n=tab.length
            await sql.query(`INSERT INTO [dbo].[questionnaire] (userid,score,numquest) values ('${idq}','${score}','${n}')` );
            ids=await sql.query(`select max(questionnaireid) as max from [dbo].[questionnaire] ` )
            for (let i = 0; i < tab.length; i++) {
                await sql.query(`INSERT INTO [dbo].[quest_used] (questionnaireid,idq,correct) VALUES ('${ids.recordset[0].max}','${tab[i].qid}','${tab[i].isCorrect}')`);
            }    
         }
         catch (err){
            console.log(err)        
            }
            finally{
                sql.close()
            }
    }
        Setdata()
})
/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx          delete    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/

 router.delete('/Delete-quest', async (req, res) => {
    try {
      await sql.connect(config);
      id = (req.body)
      
      await sql.query(`DELETE FROM [dbo].[tabquest] WHERE id = ${id.id}`);
     } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      sql.close();
    }
  });

  /* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx update xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */
  router.put("/quest-upd",(req,resp)=>{
    async function Setdata(){
        try{
            await sql.connect(config);
            data = (req.body)

            await sql.query(`update  [dbo].[tabquest] set inuse='${data.t}' where id=${data.id} ` ) 
             
         }     
         catch (err){
            console.log(err)        
            }
            finally{
                sql.close()
            }
    }
    Setdata() 
})
router.put("/det",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query(`SELECT * FROM dbo.tabrep where idq='${req.body.id}'`)
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    } 
    Getdata() 
})
router.put("/selectquestu",(req,res) =>{
    async function Getdata(){
        try{
            await sql.connect(config);
            const data =await sql.query(`SELECT * FROM dbo.quest_used where idq='${req.body.id}'`)
            res.json(data.recordset)
        }
        catch (err){
        console.log(err)        
        }
        finally{
            sql.close()
        }
    }
    Getdata() 
})
  module.exports ={router}