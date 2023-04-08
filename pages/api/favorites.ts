import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !=="GET")
return res.status(405).end()

  try {
 const {currentUser} = await serverAuth(req)
  const favoriteMovies = await prismadb.movie.findMany({
    where:{
        id:{
            in:currentUser?.favoriteIds
        }
    }
  })

return res.status(200).json(favoriteMovies)

  } catch (error) {
    console.log(error);
    res.status(404).end();
  }
}
