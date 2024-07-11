import { UserChatSidebar } from "../UserChatSidebar/userChatSidebar";
import { NoUserSelected } from "../noUserSelected/noUserSelected";
import { UserchatInterFace } from "../userChatInterface/userChatInterface";

export const UserChatDashboard = () => {
  return (
    <div>
        <div class="row">
          <div class="col-4"><UserChatSidebar/></div>
          {/* <div class="col-8"><NoUserSelected/></div> */}
          <div class="col-8"><UserchatInterFace/></div>
          
        </div>
      </div>
  );
};
