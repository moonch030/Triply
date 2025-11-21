import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import type { ColDef } from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

type StyledGridProps<T> = {
    columnDefs: ColDef<T>[];
    rowData: T[];
    onRowDragEnd?: (event: any) => void;
    rowDragManaged?: boolean;
};

export default function StyledGrid<T>({ columnDefs, rowData, onRowDragEnd,
    rowDragManaged = true }: StyledGridProps<T>) {
    return (
        <div className="h-full">
            <AgGridReact<T>
                columnDefs={columnDefs}
                rowData={rowData}
                rowDragManaged={rowDragManaged}
                onRowDragEnd={onRowDragEnd}
            // Callback
            // getRowHeight={getRowHeight}
            // Event handlers
            // onCellClicked={onCellClicked}
            />
        </div>
    );
}
