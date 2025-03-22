import { Filter, Plus } from "lucide-react";
import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import type { IRole } from "../page";

interface FilterAbilitiesProps {
  allAbilities: Array<IRole["abilities"][number]>; // 全部可供選擇的 abilities
  filterAbilities: Array<IRole["abilities"][number]>; // 目前已被勾選的 abilities
  onToggle: (ability: IRole["abilities"][number]) => void; // 父元件負責切換/更新邏輯
}

const FilterAbilities: FC<FilterAbilitiesProps> = ({ allAbilities, filterAbilities, onToggle }) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="relative inline-block">
            <Filter className="h-5 w-5 cursor-pointer" />
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-3 h-3 flex items-center justify-center text-[8px]">
              <Plus className="h-2 w-2" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {allAbilities.map((ability) => {
            const checked = filterAbilities.includes(ability);
            return (
              <DropdownMenuItem key={ability} onClick={() => onToggle(ability)}>
                <div className="flex items-center gap-2">
                  <input type="checkbox" readOnly checked={checked} />
                  <span>{ability}</span>
                </div>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {filterAbilities.map((ability) => (
        <div
          key={ability}
          className="bg-white border border-gray-300 rounded-md px-3 py-1 flex items-center gap-2 shadow-sm">
          <span className="text-sm text-gray-700">{ability}</span>
          <button className="text-sm text-gray-500 hover:text-gray-700" onClick={() => onToggle(ability)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterAbilities;
