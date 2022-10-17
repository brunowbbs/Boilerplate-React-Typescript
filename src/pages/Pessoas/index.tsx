import { useState, useEffect } from "react";
import { useDebounce } from "../../shared/hooks/useDebounce";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

const Pessoas = () => {
  const [search, setSearch] = useState("");
  const { debounce } = useDebounce();

  const page = 1;

  useEffect(() => {
    debounce(() => {
      PessoasService.getAll(page, search).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        console.log(result.data);
      });
    });
  }, [page, search]);

  return (
    <div>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
};
export default Pessoas;
