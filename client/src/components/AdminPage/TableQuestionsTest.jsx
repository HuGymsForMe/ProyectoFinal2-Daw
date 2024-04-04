import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { useState, useEffect } from "react";

import { SearchIcon } from "./icons/Icons";
import DebouncedInput from "./icons/DebouncedInput";
import DownloadBtn from "./icons/DownloadBtn";

import axios from "axios";
import { API } from "../../config/config";

function TableQuestionsTest(){
    
    const [data, setData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get(`${API}/test`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        }
    fetchData();
    }, [])

    const columnHelper = createColumnHelper();
    const columns = [
          columnHelper.accessor("", {
            id: "ID",
            cell: (info) => <span>{info.row.index + 1}</span>,
            header: "ID",
          }),
          columnHelper.accessor("question", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Pregunta",
          }),
          columnHelper.accessor("first_answer", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Primera Respuesta",
          }),
          columnHelper.accessor("second_answer", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Segunda Respuesta",
          }),
          columnHelper.accessor("third_answer", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Tercera Respuesta",
          }),
          columnHelper.accessor("correct_answer", {
            cell: (info) => <span>{info.getValue()}</span>,
            header: "Respuesta Correcta",
          }),
    ];

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return(
        <div className="p-2 max-w-5xl mx-auto text-black fill-gray-400 w-[80%]">
      <div className="flex justify-between mb-2">
        <div className="w-full flex items-center gap-1 mb-4">
          <SearchIcon />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-[#B30519] text-white"
            placeholder="Buscar"
          />
        </div>
        <DownloadBtn data={data} fileName={"preguntasTest"} />
      </div>
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-[#B30519]">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`
                ${i % 2 === 0 ? "bg-slate-100" : "bg-slate-200"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr className="text-center h-32 text-white">
              <td colSpan={12}>No existen datos con dicha búsqueda.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-white rounded-md"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30 text-white rounded-md"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1 text-white">
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1 text-white">
          | Ir a la página:
          <input
            type="number"
            min={1}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16 bg-transparent"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent text-white"
        >
          {[10, 20, 30].map((pageSize) => (
            <option key={pageSize} value={pageSize} className="text-black">
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
    )
}

export default TableQuestionsTest;