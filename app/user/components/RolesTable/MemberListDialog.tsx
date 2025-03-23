import { List } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "~/components/ui/dialog";

interface Props {
  users: Array<{
    name: string;
    email: string;
  }>;
}

const MemberListDialog = (props:Props) => {
  const { users } = props;
  return (
    <Dialog>
      <DialogTrigger>
        <List className="h-4 w-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member List</DialogTitle>
          <DialogDescription>Below are the members in this role.</DialogDescription>
        </DialogHeader>

        <ul className="mt-4 list-disc pl-6">
          {users.map((user, i) => (
            <li key={`user-${i}`} className="mb-2">
              <strong>{user.name}</strong> - {user.email}
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default MemberListDialog;
