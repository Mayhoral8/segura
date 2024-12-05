"use client";
import React, { useEffect, useContext, useState } from "react";
import { ConfigContext } from "@/contexts/ConfigContext";
import { useFilterTable } from "@/hooks/useFilterTable";
import { useSearchParams } from "next/navigation";
import { IoFilterOutline } from "react-icons/io5";

const AccountTableOperations = () => {
  const { filterTable } = useFilterTable();
  const { accountsContext } = useContext(ConfigContext);
  const { setAccounts, initialAccounts } = accountsContext;
  const [searchInput, setSearchInput] = useState("");
  const searchParams = useSearchParams();
  const filterValue = searchParams.get("status");
  const searchValue = searchParams.get("search");

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
    filterTable("search", e.target.value);
  };

  const activeAccounts = initialAccounts.filter((acc) => {
    return acc.status === "Active";
  });

  const blockedAccounts = initialAccounts.filter((acc) => {
    return acc.status === "Blocked";
  });

  const searchResultAccounts = (accounts) => {
    const matchingAccounts = accounts.filter((acc) => {
      return (
        acc.accNo.startsWith(searchValue) ||
        acc.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    });
    return matchingAccounts;
  };

  useEffect(() => {
    setAccounts(() => {
      return filterValue === "active"
        ? activeAccounts
        : filterValue === "blocked"
        ? blockedAccounts
        : !filterValue && searchValue
        ? searchResultAccounts(initialAccounts)
        : initialAccounts;
    });
  }, [filterValue]);

  // Search Operation
  useEffect(() => {
    // determine Account when searchValue params is not null
    if (searchValue !== null) {
      return setAccounts(() => {
        if (filterValue === "active") {
          return searchResultAccounts(activeAccounts);
        } else if (filterValue === "blocked") {
          return searchResultAccounts(blockedAccounts);
        } else {
          return searchResultAccounts(initialAccounts);
        }
      });
    }
    // determine Account when searchValue params is null
    if (searchValue === null) {
      return setAccounts(() => {
        if (filterValue === "active") {
          return activeAccounts;
        } else if (filterValue === "blocked") {
          return blockedAccounts;
        } else if (filterValue === null) {
          return initialAccounts;
        }
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue !== null && searchInput === "") {
      setSearchInput(searchValue);
    }
  }, []);

  return (
    <main>
      <div className="flex items-center gap-x-1">
        <h2>Filters</h2>
        <IoFilterOutline />
      </div>

      <section className="flex gap-x-10 items-center">
        <div className="flex items-center gap-x-2 text-sm">
          <button
            className={`border h-6 w-20  rounded-md text-[#2c698d] ${
              filterValue === "active" && "bg-[#2c698d] text-white"
            }`}
            onClick={() => filterTable("status", "active")}
          >
            Active
          </button>
          <button
            className={`border h-6 w-20  rounded-md text-[#2c698d] ${
              filterValue === "blocked" && "bg-[#2c698d] text-white"
            }`}
            onClick={() => filterTable("status", "blocked")}
          >
            Blocked
          </button>
        </div>

        <article className="flex flex-row gap-x-4 items-center">
          <div className="flex flex-row">
            <input
              placeholder={`account number`}
              className="border w-36 h-8 focus:outline-none px-2"
              value={searchInput}
              onChange={handleSearchInput}
            />
          </div>
        </article>
      </section>
    </main>
  );
};

export default AccountTableOperations;
