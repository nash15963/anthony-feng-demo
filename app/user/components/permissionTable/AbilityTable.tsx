import { CheckCircle, XCircle, Pencil, ChevronDown, ChevronUp } from "lucide-react";
import type { IAbilityConfig, IAllowRevokeItem } from "~/user/PermissionsTable";

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

  // 更新單筆資料的 isInChannel 狀態
  const toggleInChannel = (index: number, inChannel: boolean) => {
    onEdit((prev) => {
      const newConfigs = [...prev];
      newConfigs[id] = {
        ...newConfigs[id],
        [tableKey]: newConfigs[id][tableKey].map((item, i) =>
          i === index ? { ...item, isInChannel: inChannel } : item
        ),
      };
      return newConfigs;
    });
  };

  // 封裝移動單筆資料的函式
  // direction 為 "allowToRevoke" 表示從 allowTable 移到 revokeTable
  // direction 為 "revokeToAllow" 表示從 revokeTable 移到 allowTable
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

  return (
    <div className="bg-gray-100 my-4 p-4 rounded-md shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-4 whitespace-nowrap">
        <div className="font-bold flex items-center gap-2 w-35">
          {title && (
            <>
              <span>{`#${title}`}</span>
              <Pencil className="h-4 w-4 cursor-pointer text-gray-500" />
            </>
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

      <div className="flex flex-col gap-2 pl-40">
        {contents.map((content, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="flex-1 max-w-[300px] truncate">{content.detail}</span>
            <div className="flex items-center justify-between gap-2 w-[200px]">
              {/* 只有在目前狀態為 false 時，點擊 CheckCircle 才會切換為 true */}
              <CheckCircle
                className={`h-4 w-4 cursor-pointer ${content.isAllowed ? "text-green-500" : "text-gray-300"}`}
                onClick={() => {
                  if (!content.isAllowed) {
                    toggleItemAllowed(index, true);
                  }
                }}
              />
              {/* 只有在目前狀態為 true 時，點擊 XCircle 才會切換為 false */}
              <XCircle
                className={`h-4 w-4 cursor-pointer ${!content.isAllowed ? "text-red-500" : "text-gray-300"}`}
                onClick={() => {
                  if (content.isAllowed) {
                    toggleItemAllowed(index, false);
                  }
                }}
              />
              {/* 根據目前 table 顯示對應箭頭，並加入移動事件 */}
              {title ? (
                <ChevronDown className="h-4 w-4 cursor-pointer" onClick={() => moveItem(index, "allowToRevoke")} />
              ) : (
                <ChevronUp className="h-4 w-4 cursor-pointer" onClick={() => moveItem(index, "revokeToAllow")} />
              )}
              {/* CH 與 U 點擊功能 */}
              <span
                className={`px-2 py-0.5 text-xs rounded-md cursor-pointer ${
                  content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => toggleInChannel(index, true)}>
                CH
              </span>
              <span
                className={`px-2 py-0.5 text-xs rounded-md cursor-pointer ${
                  !content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}
                onClick={() => toggleInChannel(index, false)}>
                U
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbilityTable;
