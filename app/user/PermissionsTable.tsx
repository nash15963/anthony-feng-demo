import SearchInput from "./components/SearchInput";
import { ShieldCheck, Accessibility, Lock, UserCog } from "lucide-react";
import type { IRole } from "./page";
import AbilityTable from "./components/permissionTable/AbilityTable";

// 以下為你的型別定義與資料
type TAbilityDetail =
  | "Add Member that is not in channel"
  | "Remove Member that is in channel"
  | "Add Member that is in banned list"
  | "Move the landing channel";

export interface IAllowRevokeItem {
  detail: TAbilityDetail;
  isAllowed: boolean;
  isInChannel: boolean;
}

interface IAbilityConfig {
  allowTable: IAllowRevokeItem[];
  revokeTable: IAllowRevokeItem[];
}

type TAllAbilities = Partial<Record<IRole["abilities"][number], IAbilityConfig>>;

const initAbilities: TAllAbilities = {
  "Add Member": {
    allowTable: [
      {
        detail: "Add Member that is not in channel",
        isAllowed: true,
        isInChannel: true,
      },
      {
        detail: "Add Member that is in banned list",
        isAllowed: false,
        isInChannel: false,
      },
    ],
    revokeTable: [
      {
        detail: "Remove Member that is in channel",
        isAllowed: false,
        isInChannel: false,
      },
    ],
  },
};

const PermissionsTable = () => {
  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-md shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-lg">
          <SearchInput />
        </div>
      </div>

      <div
        id="column-bar-permission-table"
        className="flex items-center gap-2 rounded-md py-3 px-4 bg-gray-200 whitespace-nowrap">
        <div className="flex-1 flex items-center justify-start gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Permissions</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <Accessibility className="h-4 w-4" />
          <span>Accessibility</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <Lock className="h-4 w-4" />
          <span>Allow / Revoke / Move</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <UserCog className="h-4 w-4" />
          <span>For Channel / For User</span>
        </div>
      </div>

      {Object.entries(initAbilities).map(([key, config]) => (
        <div key={key}>
          <AbilityTable
            title={key as IRole["abilities"][number]}
            isAllowed={true}
            contents={config?.allowTable ?? []}
          />
          <AbilityTable
            isAllowed={false}
            contents={config?.revokeTable ?? []}
          />
        </div>
      ))}
    </div>
  );
};

export default PermissionsTable;
