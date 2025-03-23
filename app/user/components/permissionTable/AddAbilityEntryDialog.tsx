import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  abilityDetails,
  type IAbilityConfig,
  type IAllowRevokeItem,
  type TAbilityDetail,
} from "~/user/PermissionsTable";

interface AddAbilityEntryDialogProps {
  onAdd: (entry: IAllowRevokeItem) => void;
  defaultIsAllowed: boolean;
}

const AddAbilityEntryDialog: React.FC<AddAbilityEntryDialogProps> = ({ onAdd, defaultIsAllowed }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<TAbilityDetail>(abilityDetails[0]);
  const [isAllowed, setIsAllowed] = useState(defaultIsAllowed);
  const [isInChannel, setIsInChannel] = useState(false);

  const handleSubmit = () => {
    const newEntry: IAllowRevokeItem = { detail, isAllowed, isInChannel };
    onAdd(newEntry);
    // 重設欄位與關閉對話框
    setDetail(abilityDetails[0]);
    setIsAllowed(defaultIsAllowed);
    setIsInChannel(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="mt-2 flex items-center gap-1 bg-gray-200 text-black py-1 px-3 rounded hover:bg-gray-300">
          <Plus className="h-4 w-4" />
          <span>Add Entry</span>
        </button>
      </DialogTrigger>
      <DialogContent className="bg-gray-100 border-0 shadow-none">
        <DialogHeader>
          <DialogTitle>Add New Entry</DialogTitle>
          <DialogDescription>Define the new entry for this table.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Detail</label>
            <select
              value={detail}
              onChange={(e) => setDetail(e.target.value as TAbilityDetail)}
              className="p-1 rounded w-full bg-gray-100">
              {abilityDetails.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={isAllowed} onChange={(e) => setIsAllowed(e.target.checked)} />
              <span>Allowed</span>
            </label>
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={isInChannel} onChange={(e) => setIsInChannel(e.target.checked)} />
              <span>In Channel</span>
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Add</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAbilityEntryDialog;
