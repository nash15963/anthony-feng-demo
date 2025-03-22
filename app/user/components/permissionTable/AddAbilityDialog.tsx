import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Plus } from "lucide-react";
import { abilities, type IRole } from "~/user/page";


export interface IAllowRevokeItem {
  detail: IRole["abilities"][number];
  isAllowed: boolean;
  isInChannel: boolean;
}

interface AddAbilityDialogProps {
  onAdd: (newAbility: IAllowRevokeItem) => void;
}

const AddAbilityDialog: React.FC<AddAbilityDialogProps> = ({ onAdd }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detail, setDetail] = useState<IRole["abilities"][number]>("Add Member");
  const [isAllowed, setIsAllowed] = useState(true);
  const [isInChannel, setIsInChannel] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 回傳完整的 IAllowRevokeItem 資料
    onAdd({ detail, isAllowed, isInChannel });
    // 重設狀態與關閉對話框
    setDetail("Add Member");
    setIsAllowed(true);
    setIsInChannel(true);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          <span>add new</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ability</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <label className="flex flex-col gap-1">
            Detail:
            <select
              value={detail}
              // onChange={(e) => setDetail(e.target.value) as IRole["abilities"][number]}
              className="border border-gray-300 p-2 rounded">
              {abilities.map((ab, idx) => (
                <option key={`ab-${idx}`} value={ab}>
                  {ab}
                </option>
              ))}
            </select>
          </label>

          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <button type="button" className="bg-gray-300 text-gray-700 py-1 px-3 rounded">
                Cancel
              </button>
            </DialogClose>
            <button type="submit" className="bg-blue-500 text-white py-1 px-3 rounded">
              Submit
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAbilityDialog;
