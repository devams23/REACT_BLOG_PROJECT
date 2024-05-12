import React, { useEffect , useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({
    children,
    authentication = true // here authentication means this children requires authentication when accessing it
}) {
  const [loading, setloading] = useState(true);
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication && authentication !== authstatus) {
      console.log(authstatus ,authentication)
        navigate("/login")

    }

    else if (!authentication && authentication !== authstatus) {
        console.log("hey")
        console.log(authstatus ,authentication)
        navigate("/")
    }
    setloading(false)
  }, [authstatus,navigate , authentication]);

  return loading ? <div>Loading...</div> : <>{children}</> ;
}

export default Protected;
