import { useState, type FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { UserPlus } from "lucide-react";
import type { IRole } from "../page";

const allAbilities: IRole["abilities"] = [
  "Add Member",
  "Mutate/Unmutate Users",
  "Change Channel Setting",
  "Delete Channel",
  "Create Channel",
];

interface CreateRoleDialogProps {
  onCreateRole: (role: IRole) => void;
}

const CreateRoleDialog: FC<CreateRoleDialogProps> = ({ onCreateRole }) => {
  const [newRole, setNewRole] = useState<IRole>({
    role: "User",
    abilities: [],
    layer: 1,
    users: [],
  });

  // 暫存使用者輸入資料
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");

  const handleToggleAbility = (ability: IRole["abilities"][number]) => {
    setNewRole((prev) => {
      const exists = prev.abilities.includes(ability);
      if (exists) {
        return {
          ...prev,
          abilities: prev.abilities.filter((ab) => ab !== ability),
        };
      } else {
        return {
          ...prev,
          abilities: [...prev.abilities, ability],
        };
      }
    });
  };

  // 新增單一 user 至陣列
  const handleAddUser = () => {
    if (!tempName.trim() || !tempEmail.trim()) return;
    setNewRole((prev) => ({
      ...prev,
      users: [...prev.users, { name: tempName, email: tempEmail }],
    }));
    setTempName("");
    setTempEmail("");
  };

  const handleSubmit = () => {
    onCreateRole(newRole);
    setNewRole({ role: "User", abilities: [], layer: 1, users: [] });
    setTempName("");
    setTempEmail("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <UserPlus className="mr-2 h-4 w-4" />
          <span>Create Role</span>
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Role</DialogTitle>
          <DialogDescription>Fill in the information below to create a new role.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Role</label>
            <select
              className="border p-2 rounded w-full"
              value={newRole.role}
              onChange={(e) =>
                setNewRole((prev) => ({
                  ...prev,
                  role: e.target.value as IRole["role"],
                }))
              }>
              <option value="Moderator">Moderator</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Layer</label>
            <Input
              type="number"
              value={newRole.layer}
              onChange={(e) => setNewRole((prev) => ({ ...prev, layer: +e.target.value }))}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Abilities</label>
            <div className="grid grid-cols-2 gap-2">
              {allAbilities.map((ability) => (
                <label key={ability} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={newRole.abilities.includes(ability)}
                    onChange={() => handleToggleAbility(ability)}
                  />
                  {ability}
                </label>
              ))}
            </div>
          </div>

          {/* Users 輸入區域 */}
          <div>
            <label className="block mb-1 text-sm font-medium">Add User</label>
            <div className="flex gap-2 mb-2">
              <Input placeholder="Name" value={tempName} onChange={(e) => setTempName(e.target.value)} />
              <Input placeholder="Email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
              <Button onClick={handleAddUser}>Add</Button>
            </div>
            {newRole.users.length > 0 && (
              <ul className="list-disc pl-4">
                {newRole.users.map((user, idx) => (
                  <li key={idx} className="text-sm">
                    <strong>{user.name}</strong> - {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Submit 按鈕 */}
          <Button onClick={handleSubmit}>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoleDialog;
