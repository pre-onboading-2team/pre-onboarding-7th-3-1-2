import { useEffect } from "react";

import { httpClient } from "./api/api";
import { SickServiceImp } from "./api/SickService";
import { Search } from "./pages/Search";
import { GlobalStyle } from "./style/Globalstyle";

const sickService = new SickServiceImp(httpClient);
const getSick = async (params?: any) => {
  const res = await sickService.getSickList(params);
  console.log(res);
};

const App = () => {
  // useEffect(() => {
  //   getSick();
  //   getSick({ q: "담낭염" });
  // });

  return (
    <div>
      <GlobalStyle />
      <Search />
    </div>
  );
};

export default App;
