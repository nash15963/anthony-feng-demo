import { useState } from "react";
import SearchInput from "./components/SearchInput";
import { Users, Layers, User, MoreHorizontal, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import MemberListDialog from "./components/MemberListDialog";
import { type Dispatch } from "react";
import CreateRoleDialog from "./components/CreateRoleDialog";
import type { IRole } from "./page";
import FilterAbilities from "./components/FilterAbilities";

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
        <div key={index} className="border rounded-md p-4 bg-white shadow-sm">
          <div className="font-bold text-black text-left mb-2" style={{ margin: "5px", marginBottom: 20 }}>
            {role.role}
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
                    <li key={`${idx}-abs-${ability}`} className={`text-sm truncate ${isFiltered ? "text-blue-600 font-semibold" : ""}`}>
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
    </div>
  );
};

export default RolesTable;
