import { useState } from "react";
import SearchInput from "./components/SearchInput";
import { Users, Layers, User, MoreHorizontal, UserPlus, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import MemberListDialog from "./components/RolesTable/MemberListDialog";
import { type Dispatch } from "react";

import type { IRole } from "./page";
import FilterAbilities from "./components/RolesTable/FilterAbilities";
import CreateRoleDialog from "./components/RolesTable/CreateRoleDialog";

interface Props {
  roles: Array<IRole>;
  setRoles: Dispatch<React.SetStateAction<IRole[]>>;
}

const iconBgColor: Record<IRole["role"], string> = {
  Moderator: "bg-green-500",
  Admin: "bg-yellow-500",
  User: "bg-blue-500",
  Manager: "bg-red-500",
};


const RolesTable = (props: Props) => {
  const { roles, setRoles } = props;

  const [filterAbilities, setFilterAbilities] = useState<Array<IRole["abilities"][number]>>([]);

  const allAbilities = roles.reduce((acc: Array<IRole["abilities"][number]>, role) => {
    role.abilities.forEach((ab) => {
      if (!acc.includes(ab)) {
        acc.push(ab);
      }
    });
    return acc;
  }, []);

  const filteredRoles = roles.filter((role) => {
    if (filterAbilities.length === 0) return true;
    return role.abilities.some((ab) => filterAbilities.includes(ab));
  });


  const handleDelete = (index: number) => {
    setRoles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleFilter = (ability: IRole["abilities"][number]) => {
    setFilterAbilities((prev) => {
      if (prev.includes(ability)) {
        return prev.filter((ab) => ab !== ability);
      } else {
        return [...prev, ability];
      }
    });
  };

  
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-lg">
          <SearchInput />
        </div>
        <CreateRoleDialog onCreateRole={(newRole) => setRoles((prev) => [...prev, newRole])} />
      </div>

      <FilterAbilities allAbilities={allAbilities} filterAbilities={filterAbilities} onToggle={handleToggleFilter} />

      <div id="column-bar" className="flex justify-between rounded-md py-3 text-center bg-gray-200">
        <div className="flex-1 flex items-center justify-center gap-2">
          <User className="h-4 w-4" />
          <span>Roles - {roles.length}</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <Layers className="h-4 w-4" />
          <span>Layer</span>
        </div>
        <div className="flex-1 flex items-center justify-center gap-2">
          <Users className="h-4 w-4" />
          <span>Members</span>
        </div>
      </div>

      {filteredRoles.map((role, index) => (
        <div key={`${index}-role-${role}`} className="border rounded-md p-4 bg-white shadow-sm">
          <div className="font-bold text-black text-left mb-2" style={{ margin: "5px", marginBottom: 20 }}>
            {/* note: it can do nothing */}
            <label className="relative flex items-center gap-1 text-sm">
              <input type="checkbox" className="peer appearance-none h-4 w-4 border border-gray-300 bg-white" />
              <svg
                className="pointer-events-none absolute h-4 w-4 fill-current text-blue-600 opacity-0 peer-checked:opacity-100"
                viewBox="0 0 20 20">
                <path d="M16.704 5.29a1 1 0 010 1.42l-7.39 7.39a1 1 0 01-1.42 0l-3.29-3.29a1 1 0 011.42-1.42l2.58 2.58 6.68-6.68a1 1 0 011.42 0z" />
              </svg>
              <span className="ml-6">{role.role}</span>
            </label>
          </div>

          <div className="flex justify-between items-start gap-4">
            {/* Avatar */}
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback className={`text-white ${iconBgColor[role.role] || "bg-gray-500"}`}>
                  {role.role[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Abilities */}
            <div
              className="flex-1 flex flex-col items-start justify-start gap-1 px-4 max-w-xs truncate"
              style={{ maxWidth: "200px" }}>
              <ul className="list-disc list-inside pl-5">
                {role.abilities.map((ability, idx) => {
                  const isFiltered = filterAbilities.includes(ability);
                  return (
                    <li
                      key={`${idx}-abs-${ability}`}
                      className={`text-sm truncate ${isFiltered ? "text-blue-600 font-semibold" : ""}`}>
                      {ability}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Layer */}
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>#{role.layer}</span>
            </div>

            {/* Member count & list button */}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{role.users.length}</span>
              <MemberListDialog users={role.users} />
            </div>

            {/* More actions menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4 cursor-pointer" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleDelete(index)}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      {/* note: it can do nothing */}
      <button
        className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        style={{ width: 250 }}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Bulk Edit Selected Roles</span>
      </button>
    </div>
  );
};

export default RolesTable;
