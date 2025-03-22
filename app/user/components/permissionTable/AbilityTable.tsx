import { CheckCircle, XCircle, Pencil } from "lucide-react";
import type { IRole } from "~/user/page";
import type { IAllowRevokeItem } from "~/user/PermissionsTable";

interface Props {
  title?: IRole["abilities"][number];
  isAllowed: boolean;
  contents: IAllowRevokeItem[];
}

const AbilityTable = ({ title, isAllowed, contents }: Props) => {
  return (
    // 1) 改用灰底背景  2) 增加 margin top 和 bottom
    <div className="bg-gray-100 my-4 p-4 rounded-md shadow-sm flex flex-col gap-4">
      <div id="AbilityTable-column" className="flex items-center justify-start gap-4 whitespace-nowrap">
        <div className="font-bold flex items-center gap-2">
          <span className="inline-block w-28">{title ? `#${title}` : null}</span>
          <Pencil className="h-4 w-4 cursor-pointer text-gray-500" />
        </div>

        <div className="flex items-center gap-1">
          {isAllowed ? (
            <CheckCircle className="h-4 w-4 text-green-500" />
          ) : (
            <XCircle className="h-4 w-4 text-red-500" />
          )}
          <span>{isAllowed ? "Allow to ..." : "Revoke to ..."}</span>
        </div>
      </div>

      <div id="AbilityTable-content" className="flex flex-col gap-2 pl-40">
        {contents.map((content, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ maxWidth: 300 }} className="flex-1 truncate">
              {content.detail}
            </span>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                width: 200,
              }}>
              {content.isAllowed ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <CheckCircle className="h-4 w-4 text-gray-300" />
              )}

              {!content.isAllowed ? (
                <XCircle className="h-4 w-4 text-red-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-300" />
              )}

              <span
                className={`px-2 py-0.5 text-xs rounded-md ${
                  content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}>
                CH
              </span>

              <span
                className={`px-2 py-0.5 text-xs rounded-md ${
                  !content.isInChannel ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                }`}>
                U
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AbilityTable;
