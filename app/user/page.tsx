import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import RolesTable from "./RolesTable";
import PermissionsTable from "./PermissionsTable";
import { useState } from "react";

export interface IRole {
  role: "Moderator" | "Admin" | "User" | "Manager";
  abilities: Array<
    "Add Member" | "Mutate/Unmutate Users" | "Change Channel Setting" | "Delete Channel" | "Create Channel"
  >;
  layer: number;
  users: Array<{
    name: string;
    email: string;
  }>;
}

const initRoles: Array<IRole> = [
  {
    role: "Moderator",
    abilities: ["Add Member", "Mutate/Unmutate Users", "Change Channel Setting"],
    layer: 1,
    users: [
      {
        name: "John Doe",
        email: "John@email.demo.com",
      },
    ],
  },
];



const Frame = () => {
  const [roles, setRoles] = useState<IRole[]>(initRoles);
  
  return (
    <div className="bg-gray-300 py-8 min-h-screen flex justify-center items-start">
      <div className="bg-gray-100 shadow-md rounded-xl p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Role-Based Access Control</h1>

        <Tabs defaultValue="Roles" className="w-full">
          <TabsList className="justify-center">
            <TabsTrigger value="Roles">Roles</TabsTrigger>
            <TabsTrigger value="Permissions">Permissions</TabsTrigger>
          </TabsList>

          <TabsContent value="Roles">
            <RolesTable roles={roles} setRoles={setRoles}/>
          </TabsContent>
          <TabsContent value="Permissions">
            <PermissionsTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Frame;
