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
import { Input } from "~/components/ui/input";
import { Plus } from "lucide-react";
import {
  abilityDetails,
  type IAbilityConfig,
  type IAllowRevokeItem,
  type TAbilityDetail,
} from "~/user/PermissionsTable";

interface AddAbilityDialogProps {
  onAdd: (newAbilityConfig: IAbilityConfig) => void;
}

const AddAbilityDialog: React.FC<AddAbilityDialogProps> = ({ onAdd }) => {
  // 控制 Dialog 開關的狀態
  const [open, setOpen] = useState(false);
  // 狀態：自定義 title、Allow 與 Revoke 區塊的資料
  const [title, setTitle] = useState("");
  const [allowEntries, setAllowEntries] = useState<IAllowRevokeItem[]>([]);
  const [revokeEntries, setRevokeEntries] = useState<IAllowRevokeItem[]>([]);

  // 新增 Allow 區塊的資料列（預設第一項）
  const addAllowRow = () => {
    setAllowEntries((prev) => [...prev, { detail: abilityDetails[0], isAllowed: true, isInChannel: true }]);
  };

  // 新增 Revoke 區塊的資料列（預設第一項）
  const addRevokeRow = () => {
    setRevokeEntries((prev) => [...prev, { detail: abilityDetails[0], isAllowed: false, isInChannel: false }]);
  };

  // 移除 Allow 列
  const removeAllowRow = (index: number) => {
    setAllowEntries((prev) => prev.filter((_, i) => i !== index));
  };

  // 移除 Revoke 列
  const removeRevokeRow = (index: number) => {
    setRevokeEntries((prev) => prev.filter((_, i) => i !== index));
  };

  // 提交資料並重設狀態，然後關閉對話框
  const handleSubmit = () => {
    if (!title.trim()) return;
    const newAbilityConfig: IAbilityConfig = {
      title: title.trim(),
      allowTable: allowEntries,
      revokeTable: revokeEntries,
    };
    onAdd(newAbilityConfig);
    // 重設狀態
    setTitle("");
    setAllowEntries([]);
    setRevokeEntries([]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          <Plus className="h-4 w-4" />
          <span>add new</span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ability Group</DialogTitle>
          <DialogDescription>
            Enter the custom title and define ability entries for both Allow and Revoke sections.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {/* 輸入自定義 title */}
          <div>
            <label className="block mb-1 text-sm font-medium">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
          </div>
          {/* Allow 區塊 */}
          <div>
            <div className="text-sm font-semibold mb-2 flex items-center gap-2">
              <h3>Allow</h3>
              <Plus onClick={addAllowRow} className="h-4 w-4 cursor-pointer" />
            </div>
            {allowEntries.map((entry, index) => (
              <div key={`allow-${index}`} className="flex flex-col gap-2 my-5">
                <select
                  value={entry.detail}
                  onChange={(e) => {
                    const newDetail = e.target.value as TAbilityDetail;
                    setAllowEntries((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, detail: newDetail } : item))
                    );
                  }}
                  className="border p-1 rounded">
                  {abilityDetails.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-10 my-1">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={entry.isAllowed}
                      onChange={(e) =>
                        setAllowEntries((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, isAllowed: e.target.checked } : item))
                        )
                      }
                    />
                    <span>Enabled</span>
                  </label>
                  <button onClick={() => removeAllowRow(index)} className="text-red-500 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Revoke 區塊 - 與 Allow 區塊樣式相同 */}
          <div>
            <div className="text-sm font-semibold mb-2 flex items-center gap-2">
              <h3>Revoke</h3>
              <Plus onClick={addRevokeRow} className="h-4 w-4 cursor-pointer" />
            </div>
            {revokeEntries.map((entry, index) => (
              <div key={`revoke-${index}`} className="flex flex-col gap-2 my-5">
                <select
                  value={entry.detail}
                  onChange={(e) => {
                    const newDetail = e.target.value as TAbilityDetail;
                    setRevokeEntries((prev) =>
                      prev.map((item, i) => (i === index ? { ...item, detail: newDetail } : item))
                    );
                  }}
                  className="border p-1 rounded">
                  {abilityDetails.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-10 my-1">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      checked={entry.isAllowed}
                      onChange={(e) =>
                        setRevokeEntries((prev) =>
                          prev.map((item, i) => (i === index ? { ...item, isAllowed: e.target.checked } : item))
                        )
                      }
                    />
                    <span>Allowed</span>
                  </label>
                  <button onClick={() => removeRevokeRow(index)} className="text-red-500 text-sm">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* 底部按鈕 */}
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAbilityDialog;
