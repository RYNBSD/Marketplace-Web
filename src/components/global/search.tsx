"use client";
import { useState, useTransition } from "react";
// import { search } from "~/util";

export default function Search() {
  const [isSearching, startTransition] = useTransition();
  const [result, setResult] = useState([]);

  return (
    <div>
      <input
        className=""
        type="search"
        onChange={(e) =>
          startTransition(() => {
            // search(e.target.value, []).then((result) => {
            //     console.log(result);
            //     setResult(result);
            // });
          })
        }
      />
      {isSearching ? <div>Searching...</div> : <div>Results</div>}
    </div>
  );
}
