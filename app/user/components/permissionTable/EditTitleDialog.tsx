// EditTitleDialog.tsx
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
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Pencil } from "lucide-react";

interface EditTitleDialogProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
}

const EditTitleDialog: React.FC<EditTitleDialogProps> = ({ initialTitle, onSave }) => {
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);

  const handleSave = () => {
    onSave(newTitle);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="h-4 w-4 cursor-pointer text-gray-500" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Title</DialogTitle>
          <DialogDescription>Edit the title below:</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter new title" />
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTitleDialog;
