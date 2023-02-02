import type {NextApiRequest, NextApiResponse} from "next"
import  SanityClient  from "@sanity/client"



const config = {
    projectId : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset : process.env.NEXT_PUBLIC_SANITY_DATASET,
    token : process.env.SANITY_API_TOKEN,
    useCdn: process.env.NODE_ENV === "production",
}
const client = SanityClient(config);

const createComment = async ( req: NextApiRequest, res: NextApiResponse)=>{
   const {_id, name , email , comment} = JSON.parse(req.body)

   try{
    await client.create({
        _type:"comment",
        post:{
            _type: "reference",
            _ref:_id
        },
        name,
        email,
        comment
    });

   } catch(err){
    return res.status(500).json({message: "Houve algum problema... tente novamente mais tarde", err})
   }

   return res.status(200).json({message: "Comentário envaido com sucesso. Aguarde aprovação"})

}

export default createComment