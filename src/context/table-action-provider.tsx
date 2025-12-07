import { createContext, useContext, useMemo } from "react";

interface TableActionContext {
  getAction?: () => Promise<void>;
  deleteAction?: (identifier: string) => Promise<void>;
}

interface TableActionProviderProps extends TableActionContext {
  children?: React.ReactNode;
}

const TableActionContext = createContext<TableActionContext | null>(null);

export function TableActionProvider({
  getAction,
  deleteAction,
  children,
}: TableActionProviderProps) {
  const value = useMemo(
    () => ({
      getAction,
      deleteAction,
    }),
    []
  );

  return <TableActionContext value={value}>{children}</TableActionContext>;
}

export function useTableAction() {
  const context = useContext(TableActionContext);
  if (!context) {
    throw new Error("useTableAction must be used within a TableActionProvider");
  }

  return context;
}
