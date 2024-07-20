import axios from "axios";
import { headers } from "next/headers";

export default function Home() {
  console.log("is cookie exist?", headers().get("cookie"))
  const getUser = async () => {
    const user = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current-user",
      {
        method: "get",
        headers: {
          Host: "ticketing.dev",
          Cookie: headers().get("cookie"),
        },
      }
    );
    console.log("user", user.data);
  };

  getUser();
  return <div>Hello!</div>;
}
