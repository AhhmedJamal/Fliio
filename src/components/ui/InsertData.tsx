import React, { useReducer } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/lib/config";

type State = {
  collection: string;
  id: string;
  column: string;
  value: string;
  loading: boolean;
  error: string | null;
  success: string | null;
};

type Action =
  | {
      type: "SET_FIELD";
      field: keyof Pick<State, "collection" | "id" | "column" | "value">;
      value: string;
    }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "SET_ERROR"; value: string | null }
  | { type: "SET_SUCCESS"; value: string | null }
  | { type: "RESET" };

const initialState: State = {
  collection: "HeroSection",
  id: "",
  column: "title",
  value: "",
  loading: false,
  error: null,
  success: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_LOADING":
      return { ...state, loading: action.value };
    case "SET_ERROR":
      return { ...state, error: action.value };
    case "SET_SUCCESS":
      return { ...state, success: action.value };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

const InsertData: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange =
    (field: "collection" | "id" | "column" | "value") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_FIELD", field, value: e.target.value });
    };

  const handleClick = async () => {
    dispatch({ type: "SET_LOADING", value: true });
    dispatch({ type: "SET_ERROR", value: null });
    dispatch({ type: "SET_SUCCESS", value: null });

    try {
      const table = state.collection.trim();
      if (!table) throw new Error("Collection name is required");

      const id = state.id.trim();
      if (!id) throw new Error("ID (number column) is required");

      // Try to parse id as number
      const parsedId = Number(id);
      if (Number.isNaN(parsedId)) throw new Error("ID must be a number");

      // Try to interpret value as JSON (so you can pass objects like { ar: '...', de: '...' })
      let parsedValue: any = state.value;
      try {
        parsedValue = JSON.parse(state.value);
      } catch (err) {
        // keep as string if not valid JSON
        parsedValue = state.value;
      }

      // Build upsert payload dynamically
      const payload: any = { id: parsedId };
      // if column is empty, fallback to 'title'
      const columnName = state.column.trim() || "title";
      payload[columnName] = parsedValue;

      const { data, error } = await supabase
        .from(table)
        .upsert(payload)
        .select();

      if (error) {
        throw error;
      }

      dispatch({ type: "SET_SUCCESS", value: "Upsert successful" });
      console.log("Success:", data);
    } catch (err: any) {
      console.error("Error:", err);
      dispatch({ type: "SET_ERROR", value: err.message || String(err) });
    } finally {
      dispatch({ type: "SET_LOADING", value: false });
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <button className="px-3 py-1 bg-gray-200 rounded">Open</button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2 w-64">
            <label className="text-sm">collection (table)</label>
            <input
              id="name"
              value={state.collection}
              onChange={handleChange("collection")}
              className="input input-sm"
            />

            <label className="text-sm">id (number)</label>
            <input
              id="number"
              value={state.id}
              onChange={handleChange("id")}
              className="input input-sm"
            />

            <label className="text-sm">column</label>
            <input
              id="column"
              value={state.column}
              onChange={handleChange("column")}
              className="input input-sm"
            />

            <label className="text-sm">value (string or JSON)</label>
            <input
              id="value"
              value={state.value}
              onChange={handleChange("value")}
              className="input input-sm"
              placeholder='e.g. { "ar": "...", "de": "..." } or plain text'
            />

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={handleClick}
                disabled={state.loading}
                className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
              >
                {state.loading ? "Saving..." : "Save"}
              </button>

              <button
                onClick={() => dispatch({ type: "RESET" })}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Reset
              </button>
            </div>

            {state.error && (
              <p className="text-red-600 text-sm mt-2">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-600 text-sm mt-2">{state.success}</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InsertData;
