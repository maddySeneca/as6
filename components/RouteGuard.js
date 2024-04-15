import { favouritesAtom, searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { getFavourites, getHistory } from "@/lib/userData";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/authenticate";
import { useRouter } from "next/router";
import { set } from "react-hook-form";

export default function RouteGuard(props) {
  const PUBLIC_PATHS = ["/register", "/login", "/"];
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }
  function authCheck(url) {
    const path = url.split("?")[0];
    if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }
  useEffect(() => {
    updateAtoms();
    authCheck(router.pathname);

    router.events.on("routeChangeComplete", authCheck);

    return () => {
      router.events.off("routeChangeComplete", authCheck);
    };
  }, []);
  return <>{props.children}</>;
}
