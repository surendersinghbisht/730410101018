import { FC, memo, useEffect, useState } from "react";
import axios from "axios"
type TopUsersPageProps = {};

const TopUsersPage: FC<TopUsersPageProps> = (props) => {
    const[data, setData] = useState<Array>([])

    const getData = async() => {
      await axios.get("http://20.244.56.144/test/users").then((res)=> {
        setData(res.data)
    })
    }

    useEffect( ()=> {
     getData()  ;
    },[])

  return <div className="bg-black flex text-white justify-center h-screen">
<h1 className="text-2xl">Top users</h1>

{data.map(((d, index)=> {
<h2 className="text-xl text-white">{index}.{d}</h2>
}))}
  </div>;
};


export default memo(TopUsersPage);