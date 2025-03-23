import SearchInput from "./components/SearchInput";
import { ShieldCheck, Lock, UserCog, Trash2 } from "lucide-react";
import AbilityTable from "./components/permissionTable/AbilityTable";
import { useState } from "react";
import AddAbilityDialog from "./components/permissionTable/AddAbilityDialog";
import { IoAccessibilityOutline } from "react-icons/io5";

export const abilityDetails =[
  "Add Member that is not in channel",
  "Remove Member that is in channel",
  "Add Member that is in banned list",
  "Move the landing channel"
] as const;

export type TAbilityDetail = typeof abilityDetails[number];

export interface IAllowRevokeItem {
  detail: TAbilityDetail;
  isAllowed: boolean;
  isInChannel: boolean;
}

export interface IAbilityConfig {
  title: string;
  allowTable: IAllowRevokeItem[];
  revokeTable: IAllowRevokeItem[];
}


const initAbilities: IAbilityConfig[] = [
  {
    title: "Add Member",
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
    ]
  }
];

const PermissionsTable = () => {
  const [abilities, setAbilities] = useState<IAbilityConfig[]>(initAbilities);

  return (
    <div className="flex flex-col gap-4 w-full bg-gray-100 p-4 rounded-md shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-lg">
          <SearchInput />
        </div>
        <AddAbilityDialog
          onAdd={(e) => {
            setAbilities((prev) => [...prev, e]);
          }}
        />
      </div>

      <div
        id="column-bar-permission-table"
        className="flex items-center gap-2 rounded-md py-3 px-4 bg-gray-200 whitespace-nowrap">
        <div className="flex-1 flex items-center justify-start gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Permissions</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <IoAccessibilityOutline className="h-4 w-4" />
          <span>Accessibility</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <Lock className="h-4 w-4" />
          <span>Allow/Revoke/Move</span>
        </div>
        <div className="flex-1 flex items-center justify-start gap-2">
          <UserCog className="h-4 w-4" />
          <span>For Channel/For User</span>
        </div>
      </div>

      {abilities.map((config, index) => {
        return (
          <div key={`ability-${index}`}>
            <AbilityTable
              title={config.title}
              isAllowed={true}
              contents={config.allowTable}
              onEdit={setAbilities}
              id={index}
            />
            <AbilityTable isAllowed={false} contents={config.revokeTable} onEdit={setAbilities} id={index} />
          </div>
        );
      })}
      {/* note: it can do nothing */}
      <button
        className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        style={{ width: 250 }}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Bulk Edit Selected Permissions</span>
      </button>
    </div>
  );
};

export default PermissionsTable;
