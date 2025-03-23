import { CheckCircle, XCircle, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import type { IAbilityConfig, IAllowRevokeItem } from "~/user/PermissionsTable";
import EditTitleDialog from "./EditTitleDialog";
import AddAbilityEntryDialog from "./AddAbilityEntryDialog";

interface Props {
  title?: string;
  isAllowed: boolean;
  contents: IAllowRevokeItem[];
  id: number;
  onEdit: React.Dispatch<React.SetStateAction<IAbilityConfig[]>>;
}

const AbilityTable = ({ title, isAllowed, contents, onEdit, id }: Props) => {
  // 根據 title 決定目前操作的 table 為 allowTable (有 title) 或 revokeTable (無 title)
  const tableKey = title ? "allowTable" : "revokeTable";

  // 更新單筆資料的 isAllowed 狀態
  const toggleItemAllowed = (index: number, newAllowed: boolean) => {
    onEdit((prev) => {
      const newConfigs = [...prev];
      newConfigs[id] = {
        ...newConfigs[id],
        [tableKey]: newConfigs[id][tableKey].map((item, i) =>
          i === index ? { ...item, isAllowed: newAllowed } : item
        ),
      };
      return newConfigs;
    });
  };

  // 移動資料：從 allowTable 移到 revokeTable 或反向
  const moveItem = (index: number, direction: "allowToRevoke" | "revokeToAllow") => {
    onEdit((prev) => {
      const newConfigs = [...prev];
      const config = newConfigs[id];
      if (direction === "allowToRevoke") {
        const movedItem = config.allowTable[index];
        const newAllow = config.allowTable.filter((_, i) => i !== index);
        const newRevoke = [...config.revokeTable, movedItem];
        newConfigs[id] = { ...config, allowTable: newAllow, revokeTable: newRevoke };
      } else {
        const movedItem = config.revokeTable[index];
        const newRevoke = config.revokeTable.filter((_, i) => i !== index);
        const newAllow = [...config.allowTable, movedItem];
        newConfigs[id] = { ...config, allowTable: newAllow, revokeTable: newRevoke };
      }
      return newConfigs;
    });
  };

  // 刪除整筆 AbilityTable（整組資料）
  const handleDelete = () => {
    onEdit((prev) => prev.filter((_, i) => i !== id));
  };

  // 更新 AbilityTable 的 title
  const handleTitleUpdate = (newTitle: string) => {
    onEdit((prev) => {
      const newConfigs = [...prev];
      newConfigs[id] = {
        ...newConfigs[id],
        title: newTitle,
      };
      return newConfigs;
    });
  };

  // 刪除單筆資料（row）
  const deleteRow = (rowIndex: number) => {
    onEdit((prev) => {
      const newConfigs = [...prev];
      const current = newConfigs[id];
      newConfigs[id] = {
        ...current,
        [tableKey]: current[tableKey].filter((_, i) => i !== rowIndex),
      };
      return newConfigs;
    });
  };

  return (
    <div className="bg-gray-100 p-4 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between whitespace-nowrap" id="column-bar-line">
        {/* 左側：標題與狀態 */}
        <div style={{ minWidth: "300px", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "145px", display: "flex", alignItems: "center", gap: "10px" }}>
            {title && (
              <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="truncate" style={{ width: "110px" }}>{`#${title}`}</span>
                <EditTitleDialog initialTitle={title} onSave={handleTitleUpdate} />
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {isAllowed ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <XCircle className="h-4 w-4 text-red-500" />
            )}
            <span>{isAllowed ? "Allow to ..." : "Revoke to ..."}</span>
          </div>
        </div>
        {/* 右側：下拉選單（整組刪除） */}
        {title ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontal className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 pl-40">
        {contents.map((content, index) => (
          <div key={`${index}-index-content`} className="flex items-center justify-between">
            <span className={`flex-1 max-w-[300px] truncate ${!content.isAllowed ? "line-through" : ""}`}>
              {content.detail}
            </span>
            <div id="row-content" className="flex items-center gap-2">
              <div className="flex items-center gap-10" style={{ width: "150px" }}>
                <CheckCircle
                  className={`h-4 w-4 cursor-pointer ${content.isAllowed ? "text-green-500" : "text-gray-300"}`}
                  onClick={() => {
                    if (!content.isAllowed) {
                      toggleItemAllowed(index, true);
                    }
                  }}
                />
                <XCircle
                  className={`h-4 w-4 cursor-pointer ${!content.isAllowed ? "text-red-500" : "text-gray-300"}`}
                  onClick={() => {
                    if (content.isAllowed) {
                      toggleItemAllowed(index, false);
                    }
                  }}
                />
                {title ? (
                  <ChevronDown className="h-4 w-4 cursor-pointer" onClick={() => moveItem(index, "allowToRevoke")} />
                ) : (
                  <ChevronUp className="h-4 w-4 cursor-pointer" onClick={() => moveItem(index, "revokeToAllow")} />
                )}
              </div>
              <div className="flex items-center gap-10" style={{ width: "150px" }}>
                <span
                  className={`px-2 py-0.5 text-xs rounded-md cursor-pointer ${
                    content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                  CH
                </span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-md cursor-pointer ${
                    !content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                  }`}>
                  U
                </span>
              </div>
              {/* 在 row-content 尾端新增 dropdown，用來刪除單筆資料 */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal className="h-4 w-4 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => deleteRow(index)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
        {/* AbilityTable 下方新增新增單筆資料的對話框 */}
        <AddAbilityEntryDialog
          onAdd={(newEntry: IAllowRevokeItem) => {
            onEdit((prev) => {
              const newConfigs = [...prev];
              const current = newConfigs[id];
              if (title) {
                newConfigs[id] = { ...current, allowTable: [...current.allowTable, newEntry] };
              } else {
                newConfigs[id] = { ...current, revokeTable: [...current.revokeTable, newEntry] };
              }
              return newConfigs;
            });
          }}
          defaultIsAllowed={isAllowed}
        />
      </div>
    </div>
  );
};

export default AbilityTable;
